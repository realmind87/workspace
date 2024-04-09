import { useEffect, useState } from 'react';
import Button from '../buttons'
import Modal from '../modal'
import LoginForm from '../modal/components/LoginForm';
import { useApp } from 'hooks/useApp';
import { useAuth } from 'hooks/useAuth'
import Cookies from 'js-cookie';


const Header = () => {
    //const { session } = useApp()
    const { session } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    
    const onLogin = () => {
        setIsModalOpen(true)
    }
    
    // useEffect(() => {
    //     console.log('session =================')
    //     console.log(session)
    //     const user = Cookies.get('user')
    //     console.log(user)
    // }, [session])

    useEffect(() => {
        console.log('session', session)
    }, [session])

    return (
        <header className="header">
            <div className='header__inner'>
                <h1 className='logo'>W</h1>

                {!session?.token ? (
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
                    <Button
                        type="button" 
                        className='btn-login'
                        text="로그아웃"
                        onHandler={() => console.log('로그아웃')}
                    />
                )}
                
                
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