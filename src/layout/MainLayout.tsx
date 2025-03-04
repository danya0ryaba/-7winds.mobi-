import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Aside } from '../components/Aside/Aside'

type MainLayoutPropsType = {
    children?: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutPropsType> = ({
    children
}) => {
    return <div className="wrapper">
        <Header />
        <Aside />
        <div className="content">
            <Outlet />
            {children}
        </div>
    </div>
}