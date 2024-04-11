const express = require('express');
const { fakerDE: faker } = require('@faker-js/faker');
const multer = require('multer');
const router = express.Router();
const path = require("path");

const generateDate = () => {
    const lastWeek = new Date(Date.now());
    lastWeek.setDate(lastWeek.getDate() - 7);

    return faker.date.between({
        from: lastWeek,
        to: Date.now(),
    });
}

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

const users = [
    {username: 'elonmusk', avatar: faker.image.avatar(), type: 'faker'},
    {username: 'zerohch0', avatar: faker.image.avatar(), type: 'faker'},
    {username: 'leoturtle', avatar: faker.image.avatar(), type: 'faker'},
]

// const url = new URL(req.url)
// const cursor = parseInt(url.searchParams.get('cursor')) || 0

const posts = [
    {
        postId: 1,
        User: users[0],
        title: `test1111111111111111111`,
        content: `content 11111111111111111`,
        Images: [{imageId: 1, link: faker.image.urlLoremFlickr(), type: 'faker'}],
        Hearts: [users[0], users[2]],
        Comments: [],
        createdAt: generateDate(),
    },
    {
        postId: 2,
        User: users[1],
        title: `test2222222222222222222222222222`,
        content: `content 2222222222222222222222222222 2222222222222222222222222222 `,
        Images: [{imageId: 2, link: faker.image.urlLoremFlickr(), type: 'faker'}],
        Hearts: [users[0]],
        Comments: [],
        createdAt: generateDate(),
    },
    {
        postId: 3,
        User: users[2],
        title: `testt333333333333`,
        content: `content 333333333333 333333333333333333333333333333333333333333333333 333333333333`,
        Images: [{imageId: 3, link: faker.image.urlLoremFlickr(), type: 'faker'}],
        Hearts: [users[3]],
        Comments: [],
        createdAt: generateDate(),
    },
    {
        postId: 4,
        User: users[2],
        title: `testt44444444444444444444`,
        content: `content 44444444444444444444 44444444444444444444 444444444444444444444444444444444444444444444444444444444444`,
        Images: [{imageId: 3, link: faker.image.urlLoremFlickr(), type: 'faker'}],
        Hearts: [users[3]],
        Comments: [],
        createdAt: generateDate(),
    },
    {
        postId: 5,
        User: users[2],
        title: `testt55555555555555555555555`,
        content: `content 55555555555555555555555`,
        Images: [{imageId: 3, link: faker.image.urlLoremFlickr(), type: 'faker'}],
        Hearts: [users[3]],
        Comments: [],
        createdAt: generateDate(),
    }
];

router.get('/', async (req, res, ) => {

    const filteredPosts = posts.filter(post => post.title.includes(req.query.q));
    
    try {
        if (req.query.q === 'null') {
            res.json(posts);
        } else {
            res.json(filteredPosts);
        }
    } catch (e) {
        console.error(e)
        res.send('Not Allowed');
    }
})

router.get('/aside/list', async (req, res, ) => {
    
    let _posts = []
    _posts = posts.slice(0,5)

    try {
        res.json(_posts); // 로그인 성공 응답
    } catch (e) {
        console.error(e)
        res.send('Not Allowed');
    }
})

router.get('/search/result', async (req, res, ) => {
    const filteredPosts = posts.filter(post => post.title.includes(req.query.q));
    
    try {
        res.json(filteredPosts); // 로그인 성공 응답
    } catch (e) {
        console.error(e)
        res.send('Not Allowed');
    }
})

router.get('/content/:id', async (req, res, ) => {
    
    const id = parseInt(req.params.id, 10)
    const filterPost = posts.find(post => post.postId === id)

    try {
        res.json(filterPost); // 로그인 성공 응답
    } catch (e) {
        console.error(e)
        res.send('Not Allowed');
    }
})

router.post('/', async (req, res) => {
    const { userInfo, title, content } = req.body;    
    const postImagePath = req.file ? req.file.path : faker.image.urlLoremFlickr();
    const imgType = req.file ? 'uploads' : 'faker'
    const { username, avatar, type } = userInfo;

    const newPost = {
        postId: posts.length + 1,
        User: { username, avatar, type },
        title,
        content,
        Images: [{imageId: 1, link: postImagePath, imgType}],
        Hearts: [],
        Comments: [],
        createdAt: generateDate(),
    }

    posts.unshift(newPost)

    try {
        res.json(posts); // 로그인 성공 응답
    } catch (e) {
        console.error(e)
        res.send('Not Allowed');
    }
})

router.post('/upload', upload.single('imageFile'), async (req, res) => {
    const postImagePath = req.file ? req.file.path : faker.image.urlLoremFlickr();
    try {
        res.json({imageFile: postImagePath}); // 로그인 성공 응답
    } catch (e) {
        console.error(e)
        res.send('Not Allowed');
    }
})

module.exports = router;