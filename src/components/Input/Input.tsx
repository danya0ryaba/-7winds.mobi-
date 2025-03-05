import style from './Input.module.scss'

export interface InputType
    extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    name: string;
    onSend?: () => void;
}

export const Input: React.FC<InputType> = ({
    placeholder,
    type = 'text',
    className,
    name,
    onSend,
    ...otherProps
}) => {
    return (
        <input
            name={name}
            className={`${style.input} ${className}`}
            type={type}
            placeholder={placeholder}
            {...otherProps}
        />
    )
}
