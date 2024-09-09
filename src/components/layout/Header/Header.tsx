import React, { FC } from 'react';
import styles from './Header.module.css';

import notificationsIcon from '../../../assets/icons/notifications.svg';
import searchIcon from '../../../assets/icons/search.svg';
import Avatar from '../../partials/Avatar/Avatar';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
    return (
        <header data-testid="Header" className='sticky z-10 top-0 bg-white px-9 py-3 flex justify-between'>
            <div className='w-full max-w-[600px] rounded-full relative'>
                <img src={searchIcon} className='absolute top-[calc(50%_-_10px)] left-3' alt="" />
                <input type="search" placeholder='Search here...' className='w-full h-full px-3 pl-10 py-[10px] rounded-full bg-grey-50 placeholder:text-grey-500 text-sm outline-primary-500' />
            </div>
            <div className='flex gap-3'>
                <img src={notificationsIcon} alt="" />
                <Avatar url={'http://localhost:3000/images/David.png'} />
            </div>
        </header>
    );
}

export default Header;
