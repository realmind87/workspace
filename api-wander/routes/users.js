const express = require('express');
const bcrypt = require('bcrypt'); // 비밀번호 hash 구현
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require("path");
const { fakerDE: faker } = require('@faker-js/faker');
const router = express.Router();

// 간단한 메모리 기반 사용자 저장소
const users = [];

// Multer 설정: 이미지 저장 위치와 파일명 정의
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/'); // 파일이 저장될 경로
    },
    filename: function(req, file, cb) {
        // 파일명 설정: fieldname + timestamp + file extension
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// 파일 필터링: 이미지 파일만 허용
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else if (!file.originalname) {
        cb(null, false);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter })


// 로그인 라우트
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(500).json({code: 'NOT_USER', message: '가입 되어 있지 않습니다.'});
    }

    try {
        // 비밀번호 비교
        if (await bcrypt.compare(password, user.password)) {

            // 세션 생성
            req.session.user = { username: user.username };

            // JWT 생성
            const token = jwt.sign({username: user.username}, 'your_jwt_secret', { expiresIn: '1h' });

            // 쿠키에 JWT 저장
            res.cookie('token', token, {
                httpOnly: true, // XSS 공격 방지
                secure: true, // HTTPS를 사용할 때만 쿠키 전송
                sameSite: 'strict' // CSRF 공격 방지
            });

            const _user = { username: user.username, avatar: user.avatar, type: user.type }
            
            res.json({message: 'success', uesr: _user, token}); // 로그인 성공 응답

        } else {
            res.send('Not Allowed'); // 비밀번호 불일치
        }
    } catch {
        res.status(500).send("");
    }
})

router.post('/logout', async (req, res) => {
    const { auth } = req.body;
    const token = auth;
    
    // 토큰 없음
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    res.clearCookie('token');

    if (req.session) {
        req.session.destroy((err) => {
            if(err) {
                return res.status(500).send('세션 삭제 중 오류가 발생했습니다.');
            }
            res.send('로그아웃 되었습니다.');
        });
    } else {
        res.send('로그아웃 되었습니다.');
    }

})

// 회원가입
router.post('/register', upload.single('avatar'), async (req, res, next) => {
    const { username, password } = req.body;
    const avatarPath = req.file ? req.file.path : '';
    const type = req.file ? 'uploads' : 'none'
    
    // 중복 사용자
    const existingUser = users.find(user => user.username === username )
    if (existingUser) {
        return res.status(400).json({code: 'USER_EXIST', message: '가입된 회원이 있습니다.'});
    }
    
    // 비밀번호 해싱
    try {
        const saltRounds = 10; // 비밀번호 해싱의 복잡도 설정
        const hashedPassword = await bcrypt.hash(password, saltRounds); // 비밀번호 해싱
        
        // 사용자 저장
        const newUser = {username, avatar: avatarPath, password: hashedPassword, type};
         
        users.push(newUser);

        res.status(201).json (`User ${avatarPath} registered successfully`);
        
    } catch (error) {
        res.status(500).send('Server error.');
        next(error)
    }
})

// 회원탈퇴
router.delete('/delete', async (req, res) => {
    const { username } = req.body;
    
    const token = req.headers['authorization'];

    // 토큰 없음
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    
    try {
        // 토큰 검증
        const decoded = jwt.verify(token, 'your_jwt_secret');

        // 사용자 찾기
        const user = users.find(user => user.username === username);

        if (!user) {
            return res.status(400).send('Cannot find user.');
        }

        // 로그인한 사용자와 삭제 요청한 사용자가 동일한지 확인
        if (decoded.username !== user.username) {
            return res.status(401).send('Unauthorized request.');
        }

        // 비밀번호 검증
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).send('Invalid password.');
        }

        // 사용자 삭제
        const index = users.findIndex(u => u.username === username);
        users.splice(index, 1);

        res.send('User deleted successfully.');

    } catch(error) {
         // 토큰 검증 실패
        res.status(400).send('Invalid token.');
    }



})


module.exports = router;