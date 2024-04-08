import { ButtonTypes } from "./types"

const Componet: React.FC<ButtonTypes> = ({ type = 'button', className = "", text, icon = null, onHandler }) => {

    if (icon) {
        return (
            <button 
                type={type}
                className={className}
                onClick={onHandler}>
                    {icon}
            </button>
        )
    }

    return (
        <button 
            type={type} 
            className={className} 
            onClick={onHandler}>
                {text}
        </button>
    )
}

export default Componet