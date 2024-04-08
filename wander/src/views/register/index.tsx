"use client"

import React, { useState, ChangeEvent, useRef } from 'react';
import { CgProfile } from "react-icons/cg";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function SignUp() {

    const userRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordCheckRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string | null>('');
    
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0] && files[0].type.startsWith('image/')) {
            const file = files[0];
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };
    
    const onSubmitHandler = () => {
        console.log('d')
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
                                            <div>dd</div>
                                            // <image  alt="Preview" />
                                        ) : (
                                            <CgProfile size={80} color='#ccc'/>
                                        )}
                                    </label>
                                    <input id="avatar" type="file" name="avatar" accept="image/*" onChange={handleImageChange}/>
                                </div>
                            </li>
                            <li>
                                <input
                                    ref={userRef}
                                    type="text"
                                    name='userID'
                                    className="wran"
                                    placeholder="영문, 숫자 포함 8자 이상 입력해주세요"
                                />
                                {/* <p className="txt-helper wran">D</p> */}
                                
                            </li>
                            <li>
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    name="password"
                                    placeholder="영문 대문자, 숫자, 특수문자 포함 8자 이상 입력해주세요"
                                />
                                {/* {<p className="txt-helper wran">{message}</p>} */}
                            </li>
                            <li>
                                <input
                                    ref={passwordCheckRef}
                                    type="password"
                                    name="passwordCheck"
                                    className="wran"
                                    placeholder="비밀번호 다시 입력해주세요" 
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
