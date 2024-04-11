
import { useState, ChangeEvent, useRef, ChangeEventHandler, FormEventHandler, FormEvent } from 'react';
import { CgProfile } from "react-icons/cg";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { register, login } from '../../api/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {UserInfo} from '../../api/types'
import { useApp } from "../../hooks/useApp"
import { useMutations } from "../../hooks/useMutations"

export default function SignUp() {
    const queryClient = useQueryClient();
    const app = useApp()
    const mutation = useMutations()

    const navigation = useNavigate()

    // const mutation = useMutation({
    //     mutationFn: register,
    //     onError: (error, variables) => {
    //         app.setToast({ state: 'error', msg: error.message })
    //     },
    //     onSuccess: (data, variables) => {
    //         const { username, password } = variables

    //         console.log(username, password)

    //         login({username, password})

    //         queryClient.setQueryData(['user'], {username, password});

    //         // try {
    //         //     await login({username, password})

    //         //     app.setToast({ state: 'success', msg: '등록 되었습니다' })
    //         //         navigation("/")
    //         // } catch (error) {
    //         //     console.log(error)
    //         // }
    //     },
    //     onSettled: async (data, error, variables) => {
            
    //     },
    // })
    
    const [formData, setFormData] = useState<UserInfo>({
        avatar: "",
        username: "", 
        password: "",
        passwordCompleted: ""
    })

    const [stus, setStus] = useState({
        code: '',
        message: ''
    })

    const userRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordCheckRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string | null>('');
    
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        console.log(files)

        if (files && files[0] && files[0].type.startsWith('image/')) {
            const file = files[0];
            setFormData({ ...formData, avatar: file})
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
            setFormData({ ...formData, avatar: ""})
        }
    };

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const _formData = new FormData()
        const {avatar, username, password, passwordCompleted} = formData;
        _formData.append('avatar', avatar);
        _formData.append('username', username);
        _formData.append('password', password);
        _formData.append('passwordCompleted', passwordCompleted);


        

        // 유저네임 유효성 검사를 위한 정규 표현식: 영문자로 시작하고 최소 8자 이상
        const usernameRegex = /^[A-Za-z][A-Za-z0-9]{7,}$/;

        // 비밀번호 유효성 검사를 위한 정규 표현식
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]{8,}$/;

        if (username.length === 0) {
            setStus({ code: 'NO_USER', message: '아이디를 입력해주세요' })
            userRef.current?.focus();
            return
        }
    
        if (!usernameRegex.test(username)) {
            setStus({ code: 'USER_ERROR', message: '아이디 양식에 맞지 않습니다.' })
            userRef.current?.focus();
            return
        }
    
        if (password.length === 0) {
            setStus({ code: 'NO_PASSWORD', message: '비밀번호 입력해주세요' })
            passwordRef.current?.focus();
            return
        }
    
        if (!passwordRegex.test(password)) {
            setStus({ code: 'PASSWORD_ERROR', message: '비밀번호 양식에 맞지 않습니다.' })
            passwordRef.current?.focus();
            return
        }

        if (passwordCompleted.length === 0) {
            setStus({ code: 'NO_PASSWORD_COMPLETED', message: '비밀번호 확인을 입력해주세요' })
            passwordCheckRef.current?.focus();
            return
        }
        
        if (password !== passwordCompleted) {
            setStus({ code: 'NOT_PASSWORD_COMPLETED', message: '비밀번호를 다시 확인해 주세요' })
            passwordCheckRef.current?.focus();
            return
        }
        
        mutation.registerMutations.mutate(_formData);
    }

    return (
        <div id="wrap" className="signup">
            <Link to="/" className='btn-back'>
                <IoMdArrowBack size={60} color='#333' />
            </Link>
            <div className="signup-warp">
                <h1>회원가입</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="signup-content">
                        <ul>
                            <li>
                                <div className='img-avatar'>
                                    <label className='img-label' htmlFor='avatar'>
                                        {preview ? (
                                            <img src={preview}  alt="Preview" />
                                        ) : (
                                            <CgProfile size={80} color='#ccc'/>
                                        )}
                                    </label>
                                    <input 
                                        id="avatar" 
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </li>
                            <li>
                                <input
                                    ref={userRef}
                                    type="text"
                                    name='username'
                                    className={`${(stus.code === 'NO_USER' || stus.code === 'USER_ERROR') ? 'wran' : '' }`}
                                    placeholder="영문, 숫자 포함 8자 이상 입력해주세요"
                                    onChange={handleInputChange}
                                />
                                {(stus.code === 'NO_USER' || stus.code === 'USER_ERROR') && <p className="txt-helper wran">{stus.message}</p>}
                            </li>
                            <li>
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    name="password"
                                    className={`${(stus.code === 'NO_PASSWORD' || stus.code === 'PASSWORD_ERROR') ? 'wran' : '' }`}
                                    placeholder="영문 대문자, 숫자, 특수문자 포함 8자 이상 입력해주세요"
                                    onChange={handleInputChange}
                                />
                                {(stus.code === 'NO_PASSWORD' || stus.code === 'PASSWORD_ERROR') && <p className="txt-helper wran">{stus.message}</p>}
                            </li>
                            <li>
                                <input
                                    ref={passwordCheckRef}
                                    type="password"
                                    name="passwordCompleted"
                                    className={`${(stus.code === 'NO_PASSWORD_COMPLETED' || stus.code === 'NOT_PASSWORD_COMPLETED') ? 'wran' : '' }`}
                                    placeholder="비밀번호 다시 입력해주세요"
                                    onChange={handleInputChange}
                                />
                                {(stus.code === 'NO_PASSWORD_COMPLETED' || stus.code === 'NOT_PASSWORD_COMPLETED') && <p className="txt-helper wran">{stus.message}</p>}
                            </li>
                        </ul>
                    </div>
                    
                    <div className="btn-area">
                        <button type="submit" className="btn-signup">회원가입</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
