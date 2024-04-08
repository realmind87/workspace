import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { Link } from "react-router-dom";

interface FormProps {
    setOpen?:  React.Dispatch<React.SetStateAction<boolean>>;
    searchParams?: {error: string, code?: string};
}

const Form: React.FC<FormProps> = ({setOpen}) => {

    const [formData, setFormData] = useState({
        userID: "", 
        password: ""
    })
    
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e, ) => {
        e.preventDefault();
        
        // const userID = e.currentTarget.userID.value
        // const password = e.currentTarget.password.value

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
                                type="text"
                                name="userID"
                                placeholder='아이디를 입력해주세요' 
                                onChange={handleInputChange}
                            />
                            {/* <p className="txt-warn">{resData.message}</p> */}
                        </li>
                        <li>
                            <input
                                type="password"
                                name="password" 
                                className='wran' 
                                placeholder='비밀번호를 입력해주세요'
                                onChange={handleInputChange}
                            />
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