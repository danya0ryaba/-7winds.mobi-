import LogoIcon from '../../assets/logo.svg?react'
import BackIcon from '../../assets/back.svg?react'

import style from './Header.module.scss'

export const Header = () => {
    return (
        <header className={style.header}>
            <nav className={style.header__nav}>
                <ul className={style.header__list}>
                    <li className={`${style.header__item} ${style.header__icon_main}`}>
                        <LogoIcon />
                    </li>
                    <li className={`${style.header__item} ${style.header__icon_back}`}>
                        <BackIcon />
                    </li>
                    <li className={`${style.header__item} ${style.header__icon_view} ${style.header__icon_active}`}>
                        Просмотр
                    </li>
                    <li className={`${style.header__item} ${style.header__icon_view}`}>
                        Управление
                    </li>
                </ul>
            </nav>
        </header >
    )
}