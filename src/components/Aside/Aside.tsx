import { menu } from '../../constants/constants'
import style from './Aside.module.scss'

export const Aside = () => {
    return (
        <aside className={style.aside}>
            <div className={style.tab}>
                <div className={style.tab_title}>
                    <h6 className={style.tab_title__name}>Название проекта</h6>
                    <span className={style.tab_title__abbreviation}>Аббревиатура</span>
                </div>
                <div className={style.tab__arrow}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3_4487)">
                            <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="white" />
                        </g>
                    </svg>
                </div>
            </div>
            <nav className={style.nav}>
                <ul className={style.aside__list}>
                    {menu.map((item, index) => (
                        <li key={index} className={`${style.aside__list_item} ${item === 'СМР' && style.aside__list_item_active}`}>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_51766_11)">
                                    <path d="M2.75 11.9167H10.0833V2.75H2.75V11.9167ZM2.75 19.25H10.0833V13.75H2.75V19.25ZM11.9167 19.25H19.25V10.0833H11.9167V19.25ZM11.9167 2.75V8.25H19.25V2.75H11.9167Z" fill="white" />
                                </g>
                            </svg>
                            <h5 className={style.aside__title}>{item}</h5>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}