import React, { FC, useState } from 'react';
import styles from './Hospitals.module.css';

import { StaticHospital } from '../../../types';

import optionsIcon from '../../../assets/icons/options.svg';
import sortIcon from '../../../assets/icons/sort.svg';
import searchIcon from '../../../assets/icons/search.svg';
import whiteSearchIcon from '../../../assets/icons/white-search.svg';
import filterIcon from '../../../assets/icons/filter.svg';
import { ClockIcon, HomeIcon, PlusIcon } from '../../partials/icons';
import { NavLink } from 'react-router-dom';
import RatingStars from '../../partials/RatingStars/RatingStars';

type HospitalRowProps = {
    hospital: StaticHospital
}

interface HospitalsProps {}

const Hospitals: FC<HospitalsProps> = () => {
    const [presentView, setPresentView] = useState<'All Hospitals' | 'Recently Visited' | 'Favourites'>('All Hospitals');
    const hospitals: StaticHospital[] = [
        {
           name: 'Afrimed Specialist Hospital',
           address: '17, Bamidele Street, Osapa London, Lekki, Ibeju-Lekki',
           phoneNumber: '0814 609 2019',
           rating: 5
        },
        {
            name: 'Aniyun Hospital Ltd',
            address: '3, Femi Aderibigbe Close, Ifako, Gbagada, Lagos',
            phoneNumber: '0814 609 2019',
            rating: 3
        },
        {
            name: 'Araba Medical Centre',
            address: '122, Ekoro-Agbelekale Road, Big Joy B/stop, Abule Egba, Lagos.',
            phoneNumber: '0814 609 2019',
            rating: 4
        },
        {
            name: 'Blue Cross Hospital',
            address: '48, Ijaiye road, Ogba, (Beside UBA, Ikeja)',
            phoneNumber: '0814 609 2019',
            rating: 2.5
        },
        {
            name: 'Crystal Specialist Hospital',
            address: '148/150, Akowonjo Road, Dopemu, Egbeda',
            phoneNumber: '0814 609 2019',
            rating: 5
        },
        {
            name: 'Faith Care Hospital',
            address: '32 Road House 29, Festac Town, Lagos.',
            phoneNumber: '0814 609 2019',
            rating: 4.5
        },
        {
            name: 'Faith City Hospital- Ajao estate',
            address: '16, Asa-Afariogun St., Off Osolo Way, Ajao Estate, Lagos',
            phoneNumber: '0814 609 2019',
            rating: 3
        },
        {
            name: 'Faleti Medical Centre',
            address: '98, Bale Street, New Road, b/stop, Olodi Apapa, Lagos',
            phoneNumber: '0814 609 2019',
            rating: 4
        },
        {
            name: 'First City Hospital',
            address: '1B, Williams Street, Off Diya street, Behind GTBank, Sawmill, Gbagada,',
            phoneNumber: '0814 609 2019',
            rating: 5
        },
        {
            name: 'First Dominican Hospital',
            address: '27, Aljahi Masha Road, By Masha B/stop, Surulere, Lagos.',
            phoneNumber: '0814 609 2019',
            rating: 3.5
        }
    ];

    const recentlyVisited = hospitals.slice(5);
    const favourites = hospitals.slice(0, 5);

    return (
        <div data-testid="Appointments" className='px-9 py-6'>
            <div className='flex justify-between'>
                <div className='flex flex-col gap-1'>
                    <span className='text-heading-5 font-semibold'>My Hospitals</span>
                </div>
                <NavLink to={'/find'} className='self-center rounded-lg px-3 py-2 flex gap-2 text-paragraph-small font-semibold bg-primary-500 text-white'>
                    <img src={whiteSearchIcon} alt="" />
                    Find hospitals near me
                </NavLink>
            </div>
            <div className='mt-6 flex justify-start gap-3'>
                <button onClick={() => setPresentView('All Hospitals')} type='button' className={`rounded-md p-3 flex gap-2 items-center border ${presentView === 'All Hospitals' ? 'bg-primary-50 border-primary-75' : 'bg-grey-100 border-grey-300'}`}>
                    <PlusIcon fill={presentView === 'All Hospitals' ? '#f56630' : '#98a2b3'} />
                    <span className='text-paragraph-small font-medium text-grey-900'>All Hospitals</span>
                    <div className={`rounded-xl px-2 ${presentView === 'All Hospitals' ? 'bg-primary-400 text-white' : 'bg-grey-200 text-grey-700'} text-paragraph-xsmall font-medium flex items-center`}>0</div>
                </button>
                <button onClick={() => setPresentView('Recently Visited')} type='button' className={`rounded-md p-3 flex gap-2 items-center border ${presentView === 'Recently Visited' ? 'bg-primary-50 border-primary-75' : 'bg-grey-100 border-grey-300'}`}>
                    <ClockIcon fill={presentView === 'Recently Visited' ? '#f56630' : '#98a2b3'} />
                    <span className='text-paragraph-small font-medium text-grey-900'>Recently Visited</span>
                    <div className={`rounded-xl px-2 ${presentView === 'Recently Visited' ? 'bg-primary-400 text-white' : 'bg-grey-200 text-grey-700'} text-paragraph-xsmall font-medium flex items-center`}>0</div>
                </button>
                <button onClick={() => setPresentView('Favourites')} type='button' className={`rounded-md p-3 flex gap-2 items-center border ${presentView === 'Favourites' ? 'bg-primary-50 border-primary-75' : 'bg-grey-100 border-grey-300'}`}>
                    <HomeIcon fill={presentView === 'Favourites' ? '#f56630' : '#98a2b3'} />
                    <span className='text-paragraph-small font-medium text-grey-900'>Favourites</span>
                    <div className={`rounded-xl px-2 ${presentView === 'Favourites' ? 'bg-primary-400 text-white' : 'bg-grey-200 text-grey-700'} text-paragraph-xsmall font-medium flex items-center`}>0</div>
                </button>
            </div>
            <section className='mt-10'>
                <HospitalsTable hospitals={(presentView === 'All Hospitals' ? hospitals : (presentView === 'Recently Visited' ? recentlyVisited : favourites))} set={presentView} />
            </section>
        </div>
    );
}

function HospitalsTable({hospitals, set = 'All Hospitals'}: {hospitals: StaticHospital[], set: 'All Hospitals' | 'Recently Visited' | 'Favourites'}) {

    // State for hospitals and sorting
    const [sortConfig, setSortConfig] = useState<{key: 'name' | 'rating', direction: string}[]>([]);

    // Sorting function
    const sortedHospitals = hospitals.sort((a, b) => {
        for (const { key, direction } of sortConfig) {
        const order = direction === 'asc' ? 1 : -1;
        if (a[key] > b[key]) return order;
        if (a[key] < b[key]) return -order;
        }
        return 0;
    });

    // Function to handle sorting logic when a column header is clicked
    const handleSort = (key: 'name' | 'rating') => {
        setSortConfig((prevConfig) => {
        const existing = prevConfig.find((item) => item.key === key);
        if (existing) {
            // Toggle direction if field is already being sorted
            return prevConfig.map((item) =>
            item.key === key
                ? { ...item, direction: item.direction === 'asc' ? 'desc' : 'asc' }
                : item
            );
        } else {
            // Add new sorting field with ascending order
            return [...prevConfig, { key, direction: 'asc' }];
        }
        });
    };

    return (
        <div className='grow overflow-auto flex flex-col gap-5'>
            <header className='flex gap-6 items-center'>
                <span className='text-paragraph-large font-semibold text-grey-900'>{set}</span>
                <button className='ml-auto px-1 py-[2px] flex gap-1 items-center text-paragraph-small font-medium text-grey-500'>
                    <img src={searchIcon} className='h4 w-4' alt="" />
                    Search
                </button>
                <button className='px-1 py-[2px] flex gap-1 items-center text-paragraph-small font-medium text-grey-500'>
                    <img src={filterIcon} className='h4 w-4' alt="" />
                    Filter
                </button>
                <button className='px-1 py-[2px] flex gap-1 items-center text-paragraph-small font-medium text-grey-500'>
                    <img src={sortIcon} className='h4 w-4' alt="" />
                    Sort
                </button>
            </header>
            <div className='w-full overflow-auto no-scrollbar'>
                <div className='rounded-[10px] border border-grey-200 overflow-hidden min-w-fit'>
                    <header className='flex gap-4 bg-grey-50'>
                        <div className='px-6 py-3 text-paragraph-xsmall font-medium text-grey-700 flex-[3_1] min-w-[15rem] flex justify-between'>
                            Name
                            {/* <button onClick={() => setSortBy((pSB) => {
                                if (pSB === null || pSB === 'nameAsc') return 'nameDesc';
                                return 'nameAsc';
                            })} type='button'> */}
                            <button onClick={() => handleSort('name')} type='button'>
                                <img src={sortIcon} alt="" />
                            </button>
                        </div>
                        <span className='px-6 py-3 text-paragraph-xsmall font-medium text-grey-700 flex-[4_1] min-w-[15rem]'>Address</span>
                        <span className='px-6 py-3 text-paragraph-xsmall font-medium text-grey-700 flex-[1.5_1] min-w-36'>Phone number</span>
                        <div className='px-6 py-3 text-paragraph-xsmall font-medium text-grey-700 flex-[1_1] min-w-36 flex justify-between'>
                            Rating
                            <button onClick={() => handleSort('rating')} type='button'>
                                <img src={sortIcon} alt="" />
                            </button>
                        </div>
                        <span className='flex-[.5_1] grid place-items-center min-w-20'></span>
                    </header>
                    <hr className='bg-grey-200' />
                    <section className='bg-white'>
                        {
                            sortedHospitals.map(hospital => <HospitalRow key={hospital.name} hospital={hospital} />)
                        }
                    </section>
                </div>
            </div>
        </div>
    );
}

function HospitalRow({hospital}: HospitalRowProps) {
    
    return (
        <div className='flex gap-4 border-b border-b-grey-100 last:border-b-0'>
            <div className='px-6 py-5 flex-[3_1] min-w-[15rem]'>
                <span className='text-paragraph-small font-medium text-grey-900'>{hospital.name}</span>
            </div>
            <div className='px-6 py-5 flex-[4_1] min-w-[15rem]'>
                <span className='text-paragraph-small text-grey-700'>{hospital.address.slice(0,48).trim()}{hospital.address.length > 48 && '...'}</span>
            </div>
            <div className='px-6 py-5 flex-[1.5_1] min-w-36'>
                <span className='text-paragraph-small text-grey-700'>{hospital.phoneNumber}</span>
            </div>
            <div className='px-6 py-5 flex-[1_1] min-w-36'>
                <RatingStars rating={hospital.rating} />
            </div>
            <div className='flex-[.5_1] grid place-items-center min-w-20'>
                <button type="button">
                    <img src={optionsIcon} alt="" />
                </button>
            </div>
        </div>
    );
}

export default Hospitals;
