import React, { FC } from 'react';
import styles from './Layout.module.css';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
    return (
        <div data-testid="Layout" className='w-full h-full flex'>
            <Sidebar />
            <div className='flex-1 h-full flex flex-col overflow-y-auto overflow-x-hidden bg-grey-50'>
                <Header />
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
