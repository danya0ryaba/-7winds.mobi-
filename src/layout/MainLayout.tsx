import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'

type MainLayoutPropsType = {
    children?: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutPropsType> = () => {
    return <div className="wrapper">
        <Header />
        <div className="content"><Outlet /></div >
    </div>
}