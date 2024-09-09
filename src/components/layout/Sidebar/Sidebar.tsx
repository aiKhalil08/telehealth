import React, { FC, useEffect, useState } from 'react';
import styles from './Sidebar.module.css';

import { AppointementsIcon, ConsultIcon, DashboardIcon, FindIcon, HelpIcon, HistoryIcon, HospitalsIcon, ReferralIcon, SettingsIcon } from '../../partials/icons';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../../assets/logos/rayna.svg';
// import logo from '../../../assets/logos/telehealth.svg';
import logoutIcon from '../../../assets/icons/logout.svg';
import Avatar from '../../partials/Avatar/Avatar';


type MenuItem = {link: string, text: string, icon: React.ComponentType<{active?: boolean}>};

const MENU: MenuItem[] = [
    {link: '/', text: 'Dashboard', icon: DashboardIcon},
    {link: '/consult', text: 'Consult a Doctor', icon: ConsultIcon},
    {link: '/appointments', text: 'Appointments', icon: AppointementsIcon},
    // {link: '/history', text: 'Medical History', icon: HistoryIcon},
    {link: '/find', text: 'Hospitals Near Me', icon: FindIcon},
    {link: '/my-hospitals', text: 'My Hospitals', icon: HospitalsIcon},
];
const MENU_TWO: MenuItem[] = [
    {link: '/settings', text: 'Settings', icon: SettingsIcon},
    {link: '/help', text: 'Help Center', icon: HelpIcon},
    {link: '/refer', text: 'Refer Family & Friends', icon: ReferralIcon},
]

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
    return (
        <div data-testid="Sidebar" className='w-72 h-full border-r border-r-grey-200 py-6'>
            <div className='flex flex-col gap-3 h-full'>
                <header className='px-6 py-2'>
                    <img src={logo} alt="" />
                </header>
                <ul className='flex flex-col gap-1 px-2'>
                    {
                        MENU.map(menuItem => {
                            return (
                                <li key={menuItem.link}>
                                    <MenuItem item={menuItem} />
                                </li>
                            );
                        })
                    }
                </ul>
                <div className='mt-auto flex flex-col gap-[10px]'>
                    <ul className='flex flex-col gap-1 px-2'>
                        {
                            MENU_TWO.map(menuItem => {
                                return (
                                    <li key={menuItem.link}>
                                        <MenuItem item={menuItem} />
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <div className='px-6 py-5 flex justify-between gap-1 overflow-hidden items-center'>
                        <div className='flex gap-3 flex-1 items-center'>
                            <Avatar url={'/images/David.png'} />
                            <div className='flex flex-col'>
                                <span className='text-grey-900 text-sm font-semibold'>Serm Rose</span>
                                <span className='text-grey-600 text-sm break-all'>sermro18@gmail.com</span>
                            </div>
                        </div>
                        <button type="button" className='shrink-0'>
                            <img src={logoutIcon} alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


function MenuItem({item}: {item: MenuItem}) {
    const [isActive, setIsActive] = useState(false);
    const {pathname} = useLocation();
    const Icon = item.icon;

    useEffect(() => {
        setIsActive(pathname === item.link);
    }, [pathname, item.link]);

    return (
        <NavLink to={item.link} className={`flex gap-3 px-4 py-3 items-center rounded-[4px] ${isActive && 'bg-primary-50'}`}>
            <Icon active={isActive} />
            <span className='text-grey-900 text-sm'>{item.text}</span>
        </NavLink>
    );
}

export default Sidebar;
