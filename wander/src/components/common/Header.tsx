import { useState } from 'react';
import Button from '../buttons'
import Modal from '../modal'
import LoginForm from '../modal/components/LoginForm';


const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onLogin = () => {
        setIsModalOpen(true)
    }
    
    return (
        <header className="header">
            <div className='header__inner'>
                <h1 className='logo'>W</h1>

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
                
                {/* <Button
                    type="button"
                    onHandler={() => console.log('ddd')}
                    icon={<IoArrowBackSharp size={32} color="#000" />}
                /> */}
                {/* {!session ? <Button /> : <UserInfo />} */}
            </div>
        </header>
    )
}

export default Header