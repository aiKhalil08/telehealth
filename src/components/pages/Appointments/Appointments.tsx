import React, { FC, useState } from 'react';
import styles from './Appointments.module.css';

import plusIcon from '../../../assets/icons/plus.svg';
import optionsIcon from '../../../assets/icons/options.svg';
import sortIcon from '../../../assets/icons/sort.svg';
import searchIcon from '../../../assets/icons/search.svg';
import filterIcon from '../../../assets/icons/filter.svg';
import { ClockIcon, HomeIcon, PlusIcon } from '../../partials/icons';
import DoctorProfile from '../../partials/DoctorProfile/DoctorProfile';
import { Visitation } from '../../../types';
import Calendar from '../../partials/Calendar/Calendar';

type VisitationRowProps = {
    visitation: Visitation
}

interface AppointmentsProps {}

const Appointments: FC<AppointmentsProps> = () => {
    const [presentView, setPresentView] = useState<'All' | 'Upcoming' | 'Canceled'>('All');
    const visits: Visitation[] = [
        {
            doctor: {
                name: 'Dr. Alison Ogaga',
                specialty: 'General Practitioner',
                imageUrl: '/images/Alison.png',
            },
            address: {
                name: 'Cottage Medicare Hospital',
                location: "18 Iwaya Rd, Yaba 101245, Lagos",
            },
            dateTime: {
                date: '1 Aug, 2024',
                time: '1:00 PM' 
            }
        },
        {
            doctor: {
                name: 'Dr. Jennifer Johnson',
                specialty: 'Primary Care Physician',
                imageUrl: '/images/Jennifer.png',
                online: true,
            },
            address: {
                name: 'Blue Cross Hospital',
                location: "48, Ijaiye road, Ogba, (Beside UBA, Ikeja)",
            },
            dateTime: {
                date: '5 Sep, 2024',
                time: '6:00 PM' 
            }
        },
        {
            doctor: {
                name: 'Dr. Samuel Smith',
                specialty: 'Mental Health Professional',
                imageUrl: '/images/Samuel.png',
                online: true
            },
            address: {
                name: "First City Hospital",
                location: "1B, Williams Street, Off Diya street, Behind GTBank, Sawmill, Gbagada,",
            },
            dateTime: {
                date: '23 Sep, 2024',
                time: '11:34 AM' 
            }
        },
        {
            doctor: {
                name: 'Dr. Lily Chen',
                specialty: 'Dermatologist',
                imageUrl: '/images/Lily.png',
            },
            address: {
                name: 'First Dominican Hospital',
                location: "27, Aljahi Masha Road, By Masha B/stop, Surulere, Lagos.",
            },
            dateTime: {
                date: '30 Sep, 2024',
                time: '3:17 PM' 
            }
        },
        {
            doctor: {
                name: 'Dr. Angela Meryou',
                specialty: 'Surgeon',
                imageUrl: '/images/Lily.png',
            },
            address: {
                name: 'Crystal Specialist Hospital',
                location: "27, Akowonjo Road, By Vulcanizer B/stop, Egbeda, Lagos.",
            },
            dateTime: {
                date: '2 Oct, 2024',
                time: '3:00 PM' 
            }
        }
    ];

    const upcomingVisits = visits.slice(0, 2);
    const canceledVisits = visits.slice(2);

    return (
        <div data-testid="Appointments" className='px-9 py-6'>
            <div className='flex justify-between'>
                <div className='flex flex-col gap-1'>
                    <span className='text-heading-5 font-semibold'>My Appointments</span>
                    <span className="text-paragraph-medium text-grey-600">Check and filter all your medical appointments here</span>
                </div>
                <button type="button" className='self-center rounded-lg px-3 py-2 flex gap-2 text-paragraph-small font-semibold bg-primary-500 text-white'>
                    <img src={plusIcon} alt="" />
                    New Appointment
                </button>
            </div>
            <div className='mt-6 flex justify-start gap-3'>
                <button onClick={() => setPresentView('All')} type='button' className={`rounded-md p-3 flex gap-2 items-center border ${presentView === 'All' ? 'bg-primary-50 border-primary-75' : 'bg-grey-100 border-grey-300'}`}>
                    <PlusIcon fill={presentView === 'All' ? '#f56630' : '#98a2b3'} />
                    <span className='text-paragraph-small font-medium text-grey-900'>All Visits</span>
                    <div className={`rounded-xl px-2 ${presentView === 'All' ? 'bg-primary-400 text-white' : 'bg-grey-200 text-grey-700'} text-paragraph-xsmall font-medium flex items-center`}>0</div>
                </button>
                <button onClick={() => setPresentView('Upcoming')} type='button' className={`rounded-md p-3 flex gap-2 items-center border ${presentView === 'Upcoming' ? 'bg-primary-50 border-primary-75' : 'bg-grey-100 border-grey-300'}`}>
                    <ClockIcon fill={presentView === 'Upcoming' ? '#f56630' : '#98a2b3'} />
                    <span className='text-paragraph-small font-medium text-grey-900'>Upcoming Visits</span>
                    <div className={`rounded-xl px-2 ${presentView === 'Upcoming' ? 'bg-primary-400 text-white' : 'bg-grey-200 text-grey-700'} text-paragraph-xsmall font-medium flex items-center`}>0</div>
                </button>
                <button onClick={() => setPresentView('Canceled')} type='button' className={`rounded-md p-3 flex gap-2 items-center border ${presentView === 'Canceled' ? 'bg-primary-50 border-primary-75' : 'bg-grey-100 border-grey-300'}`}>
                    <HomeIcon fill={presentView === 'Canceled' ? '#f56630' : '#98a2b3'} />
                    <span className='text-paragraph-small font-medium text-grey-900'>Canceled Visits</span>
                    <div className={`rounded-xl px-2 ${presentView === 'Canceled' ? 'bg-primary-400 text-white' : 'bg-grey-200 text-grey-700'} text-paragraph-xsmall font-medium flex items-center`}>0</div>
                </button>
            </div>
            <section className='mt-10 flex gap-4'>
                <div className='w-[355px] shrink-0'>
                    <Calendar visits={visits} />
                </div>
                <VisitationsTable visitations={(presentView === 'All' ? visits : (presentView === 'Upcoming' ? upcomingVisits : canceledVisits))} set={presentView} />
            </section>
        </div>
    );
}

function VisitationsTable({visitations, set = 'All'}: {visitations: Visitation[], set: 'All' | 'Upcoming' | 'Canceled'}) {
    const [sortBy, setSortBy] = useState<'nameAsc' | 'nameDesc' | null>(null);

    const sortedVisitations = visitations.sort((a, b) => {
        if (sortBy === 'nameAsc' || sortBy == null)
            return a.doctor.name.localeCompare(b.doctor.name)
        else
            return b.doctor.name.localeCompare(a.doctor.name)
    });

    return (
        <div className='grow overflow-auto flex flex-col gap-5'>
            <header className='flex gap-6 items-center'>
                <span className='text-paragraph-large font-semibold text-grey-900'>{set} Visits</span>
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
                            <button onClick={() => setSortBy((pSB) => {
                                if (pSB === null || pSB === 'nameAsc') return 'nameDesc';
                                return 'nameAsc';
                            })} type='button'>
                                <img src={sortIcon} alt="" />
                            </button>
                        </div>
                        <span className='px-6 py-3 text-paragraph-xsmall font-medium text-grey-700 flex-[3_1] min-w-[15rem]'>Address</span>
                        <span className='px-6 py-3 text-paragraph-xsmall font-medium text-grey-700 flex-[1_1] min-w-36'>Date and time</span>
                        <span className='flex-[.5_1] grid place-items-center min-w-20'></span>
                    </header>
                    <hr className='bg-grey-200' />
                    <section className='bg-white'>
                        {
                            sortedVisitations.map(visit => <VisitationRow key={visit.doctor.name} visitation={visit} />)
                        }
                    </section>
                </div>
            </div>
        </div>
    );
}

function VisitationRow({visitation}: VisitationRowProps) {
    return (
        <div className='flex gap-4 border-b border-b-grey-100 last:border-b-0'>
            <div className='px-6 py-5 flex-[3_1] min-w-[15rem]'>
                <DoctorProfile doctor={visitation.doctor} />
            </div>
            <div className='px-6 py-5 flex-[3_1] min-w-[15rem] flex flex-col'>
                <span className='text-paragraph-small font-medium text-grey-700'>{visitation.address.name}</span>
                <span className='text-paragraph-small text-grey-500'>{visitation.address.location.slice(0,25).trim()}{visitation.address.location.length > 25 && '...'}</span>
            </div>
            <div className='px-6 py-5 flex-[1_1] min-w-36 flex flex-col'>
                <span className='text-paragraph-small font-medium text-grey-700'>{visitation.dateTime.date}</span>
                <span className='text-paragraph-small text-grey-500'>{visitation.dateTime.time}</span>
            </div>
            <div className='flex-[.5_1] grid place-items-center min-w-20'>
                <button type="button">
                    <img src={optionsIcon} alt="" />
                </button>
            </div>
        </div>
    );
}

export default Appointments;
