"use client"

import { useState, ChangeEvent, useRef, ChangeEventHandler, FormEventHandler, FormEvent } from 'react';
import { CgProfile } from "react-icons/cg";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { register, login } from '../../api/auth'
import { useMutation } from '@tanstack/react-query';
import type {UserInfo} from '../../api/types'

export default function SignUp() {

    const navigation = useNavigate()

    const mutation = useMutation({
        mutationFn: register,
        onError: (error, variables) => {
            console.log('onError====')
            console.log(error)
        },
        onSuccess: (data, variables) => {

            console.log('onSuccess====')
            console.log(data)
            console.log(variables)

            const { username, password } = variables

            try {
                login({username, password}).then((res) => {
                    alert('등록 되었습니다')
                    navigation("/")
                })
            } catch (error) {
                console.log(error)
            }
            
        },
        onSettled: (data, error, variables) => {
            console.log('onSettled====')
            console.log(variables)
            console.log(error)
            // Error or success... doesn't matter!
        },
    })
    
    const [formData, setFormData] = useState<UserInfo>({
        avatar: "",
        username: "", 
        password: "",
        passwordCompleted: ""
    })

    const userRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordCheckRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string | null>('');
    
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
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
        mutation.mutate(formData);
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
                                    className="wran"
                                    placeholder="영문, 숫자 포함 8자 이상 입력해주세요"
                                    onChange={handleInputChange}
                                />
                                {/* <p className="txt-helper wran">D</p> */}
                                
                            </li>
                            <li>
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    name="password"
                                    placeholder="영문 대문자, 숫자, 특수문자 포함 8자 이상 입력해주세요"
                                    onChange={handleInputChange}
                                />
                                {/* {<p className="txt-helper wran">{message}</p>} */}
                            </li>
                            <li>
                                <input
                                    ref={passwordCheckRef}
                                    type="password"
                                    name="passwordCompleted"
                                    className="wran"
                                    placeholder="비밀번호 다시 입력해주세요"
                                    onChange={handleInputChange}
                                    
                                />
                                
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
