import style from './Input.module.scss'

export interface InputType
    extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: React.Ref<HTMLInputElement>;
    className?: string;
    name?: string;
    onSend?: () => void;
}

export const Input: React.FC<InputType> = ({
    placeholder,
    type = 'text',
    className,
    name = '',
    onSend,
    ref,
    ...otherProps
}) => {
    return (
        <input
            ref={ref}
            className={`${style.input} ${className}`}
            type={type}
            placeholder={placeholder}
            autoFocus
            {...otherProps}
        />
    )
}
