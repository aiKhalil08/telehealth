import React, { FC } from 'react';
import styles from './Avatar.module.css';
import avatar from '../../../assets/images/avatar.webp';

interface AvatarProps {
    url?: string,
    size?: number,
    online?: boolean,
    verified?: boolean,
};

const Avatar: FC<AvatarProps> = ({url = null, size = 40, online = null, verified = null}) => {
    return (
        <div data-testid="Avatar" style={{
            width: size+'px',
            height: size+'px',
            position: 'relative',
            borderRadius: '100%',
            flexShrink: 0,
        }}>
            <img src={url || avatar} width={size} height={size} style={{
                objectFit: 'cover',
                borderRadius: '100%',
            }} alt="" />
            {
                online &&
                <div className='border-2 border-white rounded-full bg-success-600 absolute bottom-0 right-0 -translate-x-[1px] -translate-y-[1px]' style={{
                    width: size/4 +'px',
                    height: size/4 +'px',
                }}></div>
            }
        </div>
    );
}

export default Avatar;
