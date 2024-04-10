import { useEffect, useState } from 'react';
import Button from '../buttons'
import Modal from '../modal'
import LoginForm from '../modal/components/LoginForm';
import {useApp} from 'hooks/useApp'
import UserInfo from './menu/UserInfo';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';

const Header = () => {
    //const { session } = useApp()
    const navigate = useNavigate()
    const params = useParams();
    const { id } = params;
    const {cookies, userInfo} = useApp();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    
    const onLogin = () => {
        setIsModalOpen(true)
    }

   

    return (
        <header className="header">
            <div className='header__inner'>
                {id 
                    ? (
                        <Button
                            type="button"
                            text="뒤로가기"
                            icon={<IoArrowBackSharp size={32} color="#000" />}
                            onHandler={() => navigate('/')}
                        />
                    ) : (
                        <h1 className='logo'>W</h1>
                    )
                }

                {!userInfo ? (
                    <div className='login-area'>
                        <Button
                            type="button" 
                            className='btn-login'
                            text="로그인"
                            onHandler={onLogin}
                        />
                        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                            <LoginForm />
                        </Modal>
                    </div>
                ) : (
                    <UserInfo session={cookies} />
                )}
            </div>
        </header>
    )
}

export default Header