import { menu } from '../../constants/constants'
import BackIcon from '../../assets/back-aside.svg?react'
import MenuIcon from '../../assets/menu.svg?react'

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
                    <BackIcon />
                </div>
            </div>
            <nav className={style.nav}>
                <ul className={style.aside__list}>
                    {menu.map((item, index) => (
                        <li key={index} className={`${style.aside__list_item} ${item === 'СМР' && style.aside__list_item_active}`}>
                            <MenuIcon />
                            <h5 className={style.aside__title}>{item}</h5>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}