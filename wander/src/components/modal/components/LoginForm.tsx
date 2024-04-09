import { ChangeEventHandler, FormEventHandler, useEffect, useRef, useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import { login } from '../../../api/auth'
import { useApp } from "../../../hooks/useApp"
import { useMutations } from "../../../hooks/useMutations"

interface FormProps {
    setOpen?:  React.Dispatch<React.SetStateAction<boolean>>;
    searchParams?: {error: string, code?: string};
}

const Form: React.FC<FormProps> = ({setOpen}) => {
    
    const app = useApp()
    const mutation = useMutations()
    
    const userRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const [stus, setStus] = useState({
        code: '',
        message: ''
    })
    
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e, ) => {
        e.preventDefault();

        const {username, password} = formData;

        if(username.length === 0) {
            userRef.current?.focus();
            setStus({ code: 'NO_USER', message: '아이디를 입력해 주세요' })
            return 
        }

        if (password.length === 0) {
            passwordRef.current?.focus();
            setStus({ code: 'NO_PASSWORD', message: '비밀번호를 입력해 주세요' })
            return
        }

        mutation.loginMutations.mutate(formData)

        setOpen?.(false)
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <div className='login-wrap'>
                <h1>로그인</h1>
                <div className='login-content'>
                    <ul>
                        <li>
                            <input 
                                ref={userRef}
                                type="text"
                                name="username"
                                className={`${stus.code === 'NO_USER' ? 'wran' : ''}`}
                                placeholder='아이디를 입력해주세요' 
                                onChange={handleInputChange}
                            />
                            {stus.code === 'NO_USER' && <p className="txt-warn">{stus.message}</p>}
                        </li>
                        <li>
                            <input
                                ref={passwordRef}
                                type="password"
                                name="password"
                                className={`${stus.code === 'NO_PASSWORD' ? 'wran' : ''}`}
                                placeholder='비밀번호를 입력해주세요'
                                onChange={handleInputChange}
                            />
                            {stus.code === 'NO_PASSWORD' && <p className="txt-warn">{stus.message}</p>}
                        </li>
                    </ul>
                </div>
                <p className='info'>
                    계정이 없으신가요? <Link className='txt-signup' to="/views/register">가입하기</Link>
                </p>
                <div className='btn-area'>
                    <button type="submit" className='btn-login'>로그인</button>
                </div>
            </div>
        </form>
    )
}

export default Form