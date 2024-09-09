import React, { FC, useEffect, useState } from 'react';
import styles from './Calendar.module.css';
import { HomeIcon } from '../icons';
import { Visitation } from '../../../types';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

const chevronRight = <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.9025 19.1422C22.5065 18.5004 22.5065 17.4994 21.9025 16.8576L15.7734 10.3455C15.458 10.0103 14.9306 9.99432 14.5955 10.3098C14.2603 10.6252 14.2443 11.1526 14.5598 11.4877L20.6889 17.9999L14.5598 24.5121C14.2443 24.8473 14.2603 25.3747 14.5955 25.6901C14.9306 26.0055 15.458 25.9895 15.7734 25.6544L21.9025 19.1422Z" fill="#667185"/>
</svg>

const chevronLeft = <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0973 19.1422C14.4933 18.5004 14.4933 17.4994 15.0973 16.8576L21.2264 10.3455C21.5418 10.0103 22.0692 9.99432 22.4044 10.3098C22.7395 10.6252 22.7555 11.1526 22.4401 11.4877L16.311 17.9999L22.4401 24.5121C22.7555 24.8473 22.7395 25.3747 22.4044 25.6901C22.0692 26.0055 21.5418 25.9895 21.2264 25.6544L15.0973 19.1422Z" fill="#667185"/>
</svg>

interface CalendarProps {
    visits: Visitation[]
}

const Calendar: FC<CalendarProps> = ({visits}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<number | null>(currentDate.getDate());
    const [eventForSelectedDate, setEventForSelectedDate] = useState<{time: string, doctor: string, address: string} | null>(null);

    useEffect(() => {
        let event = visits.find(visit => {
            let visitDate = new Date(visit.dateTime.date);
            let presentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate as number);

            if (presentDate.getTime() === visitDate.getTime()) {
                return visit;
            }
        })

        if (event) {
            setEventForSelectedDate({
                time: event.dateTime.time,
                doctor: event.doctor.name,
                address: event.address.name+'. '+event.address.location
            })
        } else setEventForSelectedDate(null)
    }, [selectedDate, currentDate])

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getDaysInPreviousMonth = () => {
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        return new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0).getDate();
    };

    const renderCalendarDays = () => {
        const days = [];
        const daysFromPreviousMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        const totalDaysToShow = daysFromPreviousMonth + daysInMonth;
        const rowsNeeded = Math.ceil(totalDaysToShow / 7);
        const totalCells = rowsNeeded * 7;
    
        // Previous month's days
        for (let i = daysFromPreviousMonth; i > 0; i--) {
          const day = getDaysInPreviousMonth() - i + 1;
          days.push(
            <div key={`prev-${day}`} className="grid place-items-center text-grey-400">
              {day}
            </div>
          );
        }
    
        // Current month's days
        for (let i = 1; i <= daysInMonth; i++) {
            let hasEvent = visits.some(visit => {
                let visitDate = new Date(visit.dateTime.date);
                let presentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    
                if (presentDate.getTime() === visitDate.getTime()) {
                    return true;
                }
            });

            days.push(
                <div 
                key={i} 
                className={`grid place-items-center cursor-pointer hover:bg-primary-50 rounded-full relative
                    ${selectedDate === i ? 'bg-primary-500 text-white' : 'text-grey-800'}
                `}
                onClick={() => setSelectedDate(i)}
                >
                {i}
                {
                    hasEvent &&
                    <div className='w-[6px] h-[6px] rounded-full bg-primary-200 absolute bottom-1'></div>
                }
                </div>
            );
        }
    
        // Next month's days (only to fill the last row)
        const remainingCells = totalCells - days.length;
        for (let i = 1; i <= remainingCells; i++) {
          days.push(
            <div key={`next-${i}`} className="grid place-items-center text-grey-400">
              {i}
            </div>
          );
        }
    
        return days;
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        setSelectedDate(null);
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setSelectedDate(null);
    };

    return (
        <div className="w-full bg-white rounded-xl border border-grey-200">
            <h2 className="p-6 text-paragraph-large font-semibold text-grey-900">Calendar</h2>
            <hr className='bg-grey-200' />
            <div className='p-6 flex flex-col gap-4'>
                <div className="flex justify-between items-center">
                    <button type="button" onClick={prevMonth} className='rounded-full hover:bg-grey-200'>
                        {chevronLeft}
                    </button>
                    <h3 className="text-paragraph-large font-semibold text-grey-700">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                    <button type="button" onClick={nextMonth} className='rounded-full hover:bg-grey-200 transition-all'>
                        {chevronRight}
                    </button>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className="grid grid-cols-7 h-12 gap-1 text-center text-paragraph-medium text-grey-800">
                        <div className='grid place-items-center'>Mo</div>
                        <div className='grid place-items-center'>Tu</div>
                        <div className='grid place-items-center'>We</div>
                        <div className='grid place-items-center'>Th</div>
                        <div className='grid place-items-center'>Fr</div>
                        <div className='grid place-items-center'>Sa</div>
                        <div className='grid place-items-center'>Su</div>
                    </div>
                    <div className="grid grid-cols-7 auto-rows-[3rem] gap-1">
                        {renderCalendarDays()}
                    </div>
                </div>
            </div>
            {selectedDate && (
                <>
                    <hr className='bg-grey-200' />
                    <div className="p-6 flex gap-3">
                        <div className='w-[6px] bg-[#FA9874] self-stretch rounded-full'></div>
                        {
                            eventForSelectedDate ?
                            <div className='space-y-1'>
                                {/* 11:30 - 12.00 (30 min) */}
                                <div className="text-paragraph-small text-grey-600">{eventForSelectedDate.time}</div>
                                <div className="text-paragraph-medium font-medium text-grey-900">{eventForSelectedDate.doctor}</div>
                                <div className="text-paragraph-small text-grey-600">{eventForSelectedDate.address}</div>
                            </div> :
                            <div className='text-grey-600 text-paragraph-small italic py-4'>No visitation planned for this day.</div>
                        }
                    </div>
                </>
            )}
        </div>
    );
}

export default Calendar;
