import { useEffect, useState } from 'react';
import Button from '../buttons'
import Modal from '../modal'
import LoginForm from '../modal/components/LoginForm';
import {useApp} from 'hooks/useApp'
import UserInfo from './menu/UserInfo';

const Header = () => {
    //const { session } = useApp()
    const {cookies, userInfo} = useApp();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    
    const onLogin = () => {
        setIsModalOpen(true)
    }

    useEffect(() => {
        console.log('session', userInfo)
    }, [userInfo])

    return (
        <header className="header">
            <div className='header__inner'>
                <h1 className='logo'>W</h1>
                
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