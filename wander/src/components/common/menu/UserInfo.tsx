import { useState, useRef, useEffect } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { useMutation } from '@tanstack/react-query';
import config from '../../../config'
import {useApp} from '../../../hooks/useApp';
import {useMutations} from '../../../hooks/useMutations';
import {logOut} from '../../../api/auth'

const UserInfo = ({session}: any) => {
    const app = useApp();
    const mutation = useMutations()

    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    
    const handleClickOutside = (event: MouseEvent) => {
        if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
          setIsVisible(false);
        }
    };

    const logoutHandler = () => {
        mutation.logoutMutation.mutate(app.cookies)
    }
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!app.userInfo) {
        return null
    }

    return (
        <div className='user-area' ref={tooltipRef}>
            <button type="button" className='btn-user' onClick={() => setIsVisible(!isVisible)}>
                {app.userInfo?.avatar?.length !== 0 
                    ? <img 
                        src={`${config}/${app.userInfo?.avatar}`} 
                        width={32} 
                        height={32}
                        alt="프로필 이미지" 
                    /> 
                    : <BsPersonCircle size={32} color="#dfdfdf" />
                }
            </button>
            {isVisible && (
                <div className='user-info'>
                    <ul>
                        <li>
                            <strong className='user-name'>{app.userInfo?.username}</strong>
                        </li>
                        <li></li>
                        <li>
                            <strong>팔로워</strong>
                            <span className='num'>0</span>
                        </li>
                        <li>
                            <strong>팔로우</strong>
                            <span className='num'>0</span>
                        </li>
                    </ul>

                    <button type="button" className="btn-login" onClick={logoutHandler}>로그아웃</button>

                    {/* <button type="button" className="btn-login" onClick={userDelete}>회원탈퇴</button> */}
                </div>
            )}
            
        </div>
    )
}

export default UserInfo