import { useNavigate } from "react-router-dom";

export const Error = () => {
    const navigate = useNavigate();
    return (
        <>
            <article>
                <div>Error</div>
                <button onClick={() => navigate(-1)}>вернуться назад</button>
            </article>
        </>
    )
}