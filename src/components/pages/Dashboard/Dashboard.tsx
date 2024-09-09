import React, { FC } from 'react';
import styles from './Dashboard.module.css';
import Widget from '../../partials/Widget/Widget';
import calenderIcon from '../../../assets/icons/calender.svg';
import smallCalenderIcon from '../../../assets/icons/small-calender.svg';
import clockIcon from '../../../assets/icons/small-clock.svg';
import Avatar from '../../partials/Avatar/Avatar';
import thermometerIcon from '../../../assets/icons/thermometer.svg';
import boxIcon from '../../../assets/icons/box.svg';
import chatIcon from '../../../assets/icons/chat.svg';
import sunIcon from '../../../assets/icons/sun.svg';
import chartUpIcon from '../../../assets/icons/chart-up.svg';
import chevronRightIcon from '../../../assets/icons/chevron-right.svg';
import locationIcon from '../../../assets/icons/location.svg';
import megaphoneIcon from '../../../assets/icons/megaphone.svg';
import { Doctor, IconProps } from '../../../types';
import { Link } from 'react-router-dom';
import DoctorProfile from '../../partials/DoctorProfile/DoctorProfile';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {

    return (
        <div data-testid="Dashboard" className='px-9 py-6 flex flex-col'>
            <div className='flex justify-between'>
                <div className='flex flex-col gap-1'>
                    <span className='text-heading-5 font-semibold'>Welcome Serm</span>
                    <span className="text-paragraph-medium text-grey-600">It’s a sunny day today, we hope you’re taking good care of your health 😊</span>
                </div>
                <TodaysDateWidget />
            </div>
            <section className='mt-6 flex gap-4'>
                <div className='flex-1 flex flex-col gap-4'>
                    <div className='flex gap-4'>
                        <BloodPressureWidget />
                        <CholesterolLevel />
                        <GlucoseLevelWidget />
                    </div>
                    <ProfileWidget />
                </div>
                <UpcomingConsultationsWidget />
            </section>
            <section className='mt-4 flex gap-4'>
                <QuickActionsWidget />
                <RecentConsultationsWidget />
            </section>
        </div>
    );
}

function TodaysDateWidget() {

    const todaysDate = new Date()

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    const getDaySuffix = (day: number) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
        }
    };

    const formatedTodaysDate = `${todaysDate.getDate()}${getDaySuffix(todaysDate.getDate())} ${months[todaysDate.getMonth()]}, ${todaysDate.getFullYear()}`

    
    return (
        <Widget classes={'flex gap-5 px-5 py-4'}>
            <img src={calenderIcon} alt="" />
            <div className='flex flex-col gap-[2px]'>
                <span className='text-paragraph-xsmall text-[#475467]'>Today's Date</span>
                <span className='text-grey-700 text-paragraph-medium font-semibold min-w-fit'>{formatedTodaysDate}</span>
            </div>
        </Widget>
    );
}

function UpcomingConsultationsWidget() {
    return (
        <Widget classes='max-w-[355px] grow'>
            <header className='p-6 text-paragraph-large font-semibold text-grey-900'>Upcoming Consultations</header>
            <hr className='h-[1px] bg-grey-200' />
            <div className='p-6 flex flex-col gap-6'>
                <div className='flex flex-col gap-3'>
                    <span className='text-paragraph-large font-semibold text-grey-900'>Friday 6, October</span>
                    <div className='flex gap-3'>
                        <img src={clockIcon} alt="" />
                        <span className='text-paragraph-small text-grey-600'>11.30 - 12.00 (30 min)</span>
                    </div>
                    <div className='flex gap-3'>
                        <img src={smallCalenderIcon} alt="" />
                        <span className='text-paragraph-small text-grey-600'>Cottage Medicare Hospital, 18 Iwaya Rd, Yaba 101245, Lagos</span>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <Avatar url={'http://localhost:3000/images/Alison.png'} online={true} size={48} />
                    <div className='flex flex-col gap-[2px]'>
                        <span className='text-paragraph-medium font-medium text-grey-900'>Dr. Alison Ogaga</span>
                        <span className='text-paragraph-small text-grey-600'>General Practioner </span>
                    </div>
                </div>
            </div>
            <hr className='h-[1px] bg-grey-200' />
            <div className='p-6 flex gap-[9px]'>
                <button type="button" className='rounded-lg px-4 py-2 text-paragraph-small font-semibold text-grey-700 border border-grey-300'>Reschedule</button>
                <button type="button" className='rounded-lg px-4 py-2 text-paragraph-small font-semibold bg-primary-500 text-white'>Confirm appointment</button>
            </div>
        </Widget>
    );
}

function BloodPressureWidget() {
    return (
        <Widget classes='flex-1 p-4 flex gap-4 self-center'>
            <div className='flex flex-col gap-1 grow'>
                <span className='text-paragraph-small text-grey-600'>Blood pressure</span>
                <div>
                    <span className='text-heading-6 font-semibold text-[#344054]'>118/75</span>{' '}<span className='text-grey-700 text-paragraph-small'>mm/hg</span>
                </div>
            </div>
            <img src={thermometerIcon} alt="" className='self-center' />
        </Widget>
    );
}

function CholesterolLevel() {
    return (
        <Widget classes='flex-1 p-4 flex gap-4'>
            <div className='flex flex-col gap-2 grow'>
                <span className='text-paragraph-small text-grey-600'>Cholesterol level</span>
                <div>
                    <span className='text-heading-6 font-semibold text-[#344054]'>164</span>{' '}<span className='text-grey-700 text-paragraph-small'>mg/dl</span>
                </div>
                <div className='flex gap-[6px]'>
                    <div className='rounded-[10px] bg-success-50 px-1 flex gap-[2px]'>
                        <img src={chartUpIcon} alt="" />
                        <span className='text-paragraph-xsmall font-medium text-success-600'>5%</span>
                    </div>
                    <span className='text-success-600 text-paragraph-xsmall'>Healthy</span>
                </div>
            </div>
            <img src={boxIcon} alt="" className='self-center' />
        </Widget>
    );
}

function GlucoseLevelWidget() {
    return (
        <Widget classes='flex-1 p-4 flex gap-4'>
            <div className='flex flex-col gap-2 grow'>
                <span className='text-paragraph-small text-grey-600'>Glucose level</span>
                <div>
                    <span className='text-heading-6 font-semibold text-[#344054]'>5.5</span>{' '}<span className='text-grey-700 text-paragraph-small'>mmol/L</span>
                </div>
                <div className='flex gap-[6px]'>
                    <div className='rounded-[10px] bg-success-50 px-1 flex gap-[2px]'>
                        <img src={chartUpIcon} alt="" />
                        <span className='text-paragraph-xsmall font-medium text-success-600'>5%</span>
                    </div>
                    <span className='text-success-600 text-paragraph-xsmall'>Healthy</span>
                </div>
            </div>
            <img src={sunIcon} alt="" className='self-center' />
        </Widget>
    );
}

function ProfileWidget() {
    return (
        <Widget classes='flex-1 flex flex-col'>
            <header className='p-6 text-paragraph-large font-semibold text-grey-900'>Your Profile</header>
            <hr className='h-[1px] bg-grey-200' />
            <div className='flex grow'>
                <div className='p-6 flex flex-col gap-3 w-56'>
                    <Avatar size={64} url={'http://localhost:3000/images/David.png'} />
                    <div className='flex flex-col gap-2'>
                        <span className='text-paragraph-medium font-semibold text-grey-900'>Serm Rose</span>
                        <span className='text-paragraph-small text-grey-600'>HMO ID: RET/15118/A</span>
                    </div>
                </div>
                <div className='w-[1px] bg-grey-200'></div>
                <div className='p-6 grid grid-cols-4 grid-rows-2 flex-1'>
                    <div className='flex flex-col gap-1'>
                        <span className='text-paragraph-small text-grey-600'>Age</span>
                        <span className='text-paragraph-medium font-semibold text-grey-900'>26 y/o</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-paragraph-small text-grey-600'>Date of Birth</span>
                        <span className='text-paragraph-medium font-semibold text-grey-900'>15-05-1994</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-paragraph-small text-grey-600'>Height</span>
                        <span className='text-paragraph-medium font-semibold text-grey-900'>6”7 In</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-paragraph-small text-grey-600'>Weight</span>
                        <span className='text-paragraph-medium font-semibold text-grey-900'>80 kg</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-paragraph-small text-grey-600'>HMO Plan</span>
                        <span className='text-paragraph-medium font-semibold text-grey-900'>Red Beryl</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-paragraph-small text-grey-600'>Expires on</span>
                        <span className='text-paragraph-medium font-semibold text-grey-900'>24-07-2024</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-paragraph-small text-grey-600'>Status</span>
                        <span className='text-paragraph-medium font-semibold text-grey-900'>
                            <div className='rounded-xl bg-success-50 px-3 py-[2px] text-paragraph-small text-success-600 font-medium w-fit'>
                                Active
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </Widget>
    );
}

function RecentConsultationsWidget() {

    const recentConsultations: Doctor[] = [
        {name: 'Dr. Alison Ogaga', specialty: 'General Practitioner', online: true, imageUrl: 'http://localhost:3000/images/Alison.png'},
        {name: 'Dr. Jennifer Johnson', specialty: 'Primary Care Physician', online: false, imageUrl: 'http://localhost:3000/images/Jennifer.png'},
        {name: 'Dr. Anish Patel', specialty: 'General Practitioner', online: true, imageUrl: 'http://localhost:3000/images/Anish.png'},
        {name: 'Dr. Samuel Smith', specialty: 'Mental Health Professional', online: false, imageUrl: 'http://localhost:3000/images/Samuel.png'},
        {name: 'Dr. Lily Chen', specialty: 'Dermatologist', online: true, imageUrl: 'http://localhost:3000/images/Lily.png'},
    ];
    return (
        <Widget classes='flex-1 self-start'>
            <header className='p-6 flex justify-between items-center'>
                <span className='text-paragraph-large font-semibold text-grey-900'>Recent Consultations</span>
                <button type='button' className='flex gap-[10px] items-center'>
                    <span className='text-paragraph-medium font-semibold text-grey-500'>See all</span>
                    <img src={chevronRightIcon} alt="" />
                </button>
            </header>
            <hr className='h-[1px] bg-grey-200' />
            <ul>
                {
                    recentConsultations.map(consultation => {
                        return (
                            <li key={consultation.name} className='px-6 py-5 flex justify-between border-b border-b-grey-100 last:border-b-0'>
                                <DoctorProfile doctor={consultation} />
                                <button type="button" className='self-center rounded-lg px-4 py-2 text-paragraph-small font-semibold text-grey-700 border border-grey-300'>Send a message</button>
                            </li>
                        );
                    })
                }
            </ul>
        </Widget>
    );
}

function QuickActionsWidget() {
    type QuickAction = {
        icon: string,
        title: string,
        description: string,
        link: string,
    };

    const quickActions: QuickAction[] = [
        {title: 'Book an appointment', description: 'Find a doctor and specialization', link: '', icon: calenderIcon},
        {title: 'Request consultation', description: 'Talk to a specialist', link: '/consult', icon: chatIcon},
        {title: 'Locate a hospital near you', description: 'Find closest hospitals', link: '', icon: locationIcon},
        {title: 'Emergency', description: 'Request immediate help', link: '', icon: megaphoneIcon},
    ];

    return (
        <Widget classes='max-w-[447px] flex-1 self-start'>
            <header className='p-6 text-paragraph-large font-semibold text-grey-900'>Quick Actions</header>
            <hr className='h-[1px] bg-grey-200' />
            <ul>
                {
                    quickActions.map(action => {
                        return (
                            <li key={action.title}>
                                <Link to={action.link} className='px-6 py-5 flex justify-between border-b border-b-grey-100 last:border-b-0'>
                                    <div className='flex gap-3'>
                                        <img src={action.icon} alt="" height={48} width={48} />
                                        <div className='flex flex-col'>
                                            <span className='text-paragraph-medium font-medium text-grey-900'>{action.title}</span>
                                            <span className='text-paragraph-small text-grey-600'>{action.description}</span>
                                        </div>
                                    </div>
                                    <span className=''>
                                        <img src={chevronRightIcon} alt="" height={24} width={24} />
                                    </span>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </Widget>
    );
}

export default Dashboard;
