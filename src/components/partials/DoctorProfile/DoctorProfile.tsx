import React, { FC } from 'react';
import styles from './DoctorProfile.module.css';
import Avatar from '../Avatar/Avatar';
import { Doctor } from '../../../types';

interface DoctorProfileProps {
    doctor: Doctor
}

const DoctorProfile: FC<DoctorProfileProps> = ({doctor}) => {
    return (
        <div className='flex gap-3'>
            <Avatar url={doctor.imageUrl} online={doctor.online} />
            <div className='flex flex-col'>
                <span className='text-paragraph-small font-medium text-grey-900'>{doctor.name}</span>
                <span className='text-paragraph-small text-grey-600'>{doctor.specialty}</span>
            </div>
        </div>
    );
}

export default DoctorProfile;
