import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useApp } from '../../hooks/useApp'


type ToastProps = {
    state: string,
    msg: string;
}

const Toast: React.FC<ToastProps> = ({state, msg}) => {
    {/* info error, wran, success */}
    const [shouldFadeOut, setShouldFadeOut] = useState(false);
    const app = useApp();

    const onClose = () => {
        if (app.setToast !== null) {
            app.setToast(null);
        }
    }
    
    useEffect(() => {
        let timer: NodeJS.Timeout;


        if (app.toast) {
            setShouldFadeOut(true)
            
            // 1초 후에 fadeOut 애니메이션 시작
            timer = setTimeout(() => {
                setShouldFadeOut(false)
                setTimeout(onClose, 3000)
            }, 2000); // 여기서는 1초 후에 애니메이션 시작
        }
        
        return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 제거

    }, []);

    return (
        <div className={`toast ${state} ${shouldFadeOut ? 'open' : 'close'}`}>
            <p>{msg}</p>
            <button className="toast__close">
                <IoIosClose color="#fff" size={20} />
            </button>
        </div>
    )
}

export default Toast;