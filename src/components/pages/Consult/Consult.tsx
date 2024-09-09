import React, { FC, useState } from 'react';
import styles from './Consult.module.css';

import plusIcon from '../../../assets/icons/plus.svg';
import optionsIcon from '../../../assets/icons/options.svg';
import sortIcon from '../../../assets/icons/sort.svg';
import { ChatIcon, ClockIcon } from '../../partials/icons';
import DoctorProfile from '../../partials/DoctorProfile/DoctorProfile';
import { Doctor } from '../../../types';

type Consultation = {
    doctor: Doctor,
    conversation: {
        title: string,
        content: string,
    },
    dateTime: {
        date: string,
        time: string
    }
};
type ConsultationRowProps = {
    consultation: Consultation
}

interface ConsultProps {}

const Consult: FC<ConsultProps> = () => {
    const [presentView, setPresentView] = useState<'ongoing' | 'closed'>('ongoing');
    const consultations: Consultation[] = [
        {
            doctor: {
                name: 'Dr. Alison Ogaga',
                specialty: 'General Practitioner',
                imageUrl: 'http://localhost:3000/images/Alison.png',
            },
            conversation: {
                title: 'I\'m feeling uneasy',
                content: "Good morning. I'm sorry to hear that you're not feeling well. Can you tell me more about your symptoms? How long have you been feeling this way?",
            },
            dateTime: {
                date: '1 Jul, 2024',
                time: '1:00 PM' 
            }
        },
        {
            doctor: {
                name: 'Dr. Jennifer Johnson',
                specialty: 'Primary Care Physician',
                imageUrl: 'http://localhost:3000/images/Jennifer.png',
                online: true,
            },
            conversation: {
                title: 'I have a rash',
                content: "Let's run some tests to understand better what might be causing these symptoms.",
            },
            dateTime: {
                date: '5 Aug, 2024',
                time: '6:09 PM' 
            }
        },
        {
            doctor: {
                name: 'Dr. Samuel Smith',
                specialty: 'Mental Health Professional',
                imageUrl: 'http://localhost:3000/images/Samuel.png',
                online: true
            },
            conversation: {
                title: "I'm suffering from anxiety",
                content: "Good afternoon. It's important that we address this. Anxiety can significantly impact your quality of life. Let's explore some strategies and perhaps treatments that can help you manage your anxiety effectively.",
            },
            dateTime: {
                date: '23 Aug, 2024',
                time: '11:34 AM' 
            }
        },
        {
            doctor: {
                name: 'Dr. Lily Chen',
                specialty: 'Dermatologist',
                imageUrl: 'http://localhost:3000/images/Lily.png',
            },
            conversation: {
                title: 'I have a rash',
                content: "Hello, let's take a look at that rash. I'll also ask you some questions about your symptoms and any potential allergens or irritants you might have been exposed to.",
            },
            dateTime: {
                date: '30 Aug, 2024',
                time: '3:17 PM' 
            }
        }
    ];

    const closedConsultations = consultations.slice(-3, -1)

    return (
        <div data-testid="Consult" className='px-9 py-6'>
            <div className='flex justify-between'>
                <div className='flex flex-col gap-1'>
                    <span className='text-heading-5 font-semibold'>Consult a Doctor</span>
                    <span className="text-paragraph-medium text-grey-600">Check and filter all your medical appointments here</span>
                </div>
                <button type="button" className='self-center rounded-lg px-3 py-2 flex gap-2 text-paragraph-small font-semibold bg-primary-500 text-white'>
                    <img src={plusIcon} alt="" />
                    New Consultation
                </button>
            </div>
            <div className='mt-6 flex justify-start gap-3'>
                <button onClick={() => setPresentView('ongoing')} type='button' className={`rounded-md p-3 flex gap-2 items-center border ${presentView === 'ongoing' ? 'bg-primary-50 border-primary-75' : 'bg-grey-100 border-grey-300'}`}>
                    <ChatIcon fill={presentView === 'ongoing' ? '#f56630' : '#98a2b3'} />
                    <span className='text-paragraph-small font-medium text-grey-900'>Ongoing Consultations</span>
                    <div className={`rounded-xl px-2 ${presentView === 'ongoing' ? 'bg-primary-400 text-white' : 'bg-grey-200 text-grey-700'} text-paragraph-xsmall font-medium flex items-center`}>0</div>
                </button>
                <button onClick={() => setPresentView('closed')} type='button' className={`rounded-md p-3 flex gap-2 items-center border ${presentView === 'closed' ? 'bg-primary-50 border-primary-75' : 'bg-grey-100 border-grey-300'}`}>
                    <ClockIcon fill={presentView === 'closed' ? '#f56630' : '#98a2b3'} />
                    <span className='text-paragraph-small font-medium text-grey-900'>Closed Consultations</span>
                    <div className={`rounded-xl px-2 ${presentView === 'closed' ? 'bg-primary-400 text-white' : 'bg-grey-200 text-grey-700'} text-paragraph-xsmall font-medium flex items-center`}>0</div>
                </button>
            </div>
            <ConsultationsTable consultations={(presentView === 'ongoing' ? consultations : closedConsultations)} />
        </div>
    );
}

function ConsultationsTable({consultations}: {consultations: Consultation[]}) {
    const [sortBy, setSortBy] = useState<'nameAsc' | 'nameDesc' | null>(null);

    const sortedConsultations = consultations.sort((a, b) => {
        if (sortBy === 'nameAsc' || sortBy === null)
            return a.doctor.name.localeCompare(b.doctor.name)
        else
            return b.doctor.name.localeCompare(a.doctor.name)
    });
    return (
        <div className='mt-10 overflow-auto no-scrollbar'>
            <div className='rounded-[10px] border border-grey-200 overflow-hidden min-w-fit'>
                <header className='flex gap-4 bg-grey-50'>
                    <div className='px-6 py-3 text-paragraph-xsmall font-medium text-grey-700 flex-[2_1] min-w-[15rem] flex justify-between'>
                        Name
                        <button onClick={() => setSortBy((pSB) => {
                            if (pSB === null || pSB === 'nameAsc') return 'nameDesc';
                            return 'nameAsc';
                        })} type='button'>
                            <img src={sortIcon} alt="" />
                        </button>
                    </div>
                    <span className='px-6 py-3 text-paragraph-xsmall font-medium text-grey-700 flex-[4.5_1] min-w-[25rem]'>Conversation</span>
                    <span className='px-6 py-3 text-paragraph-xsmall font-medium text-grey-700 flex-[1_1] min-w-36'>Date and time</span>
                    <span className='flex-[.5_1] grid place-items-center min-w-20'></span>
                </header>
                <hr className='bg-grey-200' />
                <section className='bg-white'>
                    {
                        sortedConsultations
                        .map(consultation => <ConsultationRow key={consultation.doctor.name} consultation={consultation} />)
                    }
                </section>
            </div>
        </div>
    );
}

function ConsultationRow({consultation}: ConsultationRowProps) {
    return (
        <div className='flex gap-4 border-b border-b-grey-100 last:border-b-0'>
            <div className='px-6 py-5 flex-[2_1] min-w-[15rem]'>
                <DoctorProfile doctor={consultation.doctor} />
            </div>
            <div className='px-6 py-5 flex-[4.5_1] min-w-[25rem] flex flex-col'>
                <span className='text-paragraph-small font-medium text-grey-700'>{consultation.conversation.title}</span>
                <span className='text-paragraph-small text-grey-500'>{consultation.conversation.content.slice(0,75).trim()}{consultation.conversation.content.length > 75 && '...'}</span>
            </div>
            <div className='px-6 py-5 flex-[1_1] min-w-36 flex flex-col'>
                <span className='text-paragraph-small font-medium text-grey-700'>{consultation.dateTime.date}</span>
                <span className='text-paragraph-small text-grey-500'>{consultation.dateTime.time}</span>
            </div>
            <div className='flex-[.5_1] grid place-items-center min-w-20'>
                <button type="button">
                    <img src={optionsIcon} alt="" />
                </button>
            </div>
        </div>
    );
}

export default Consult;
