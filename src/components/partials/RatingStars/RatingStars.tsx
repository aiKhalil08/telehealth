import React, { FC } from 'react';
import styles from './RatingStars.module.css';

import starIcon from '../../../assets/icons/star.svg';

interface RatingStarsProps {
    rating: number
}

const RatingStars: FC<RatingStarsProps> = ({rating}) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const fullStarIcons = [...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} width="18" height="16">
            <use xlinkHref={`${starIcon}#full-star`} />
        </svg>
    ));
    const halfStarIcon = hasHalfStar && (
        <svg width="18" height="16">
            <use xlinkHref={`${starIcon}#half-star`} />
        </svg>
    );
    const emptyStarIcons = [...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} width="18" height="16">
            <use xlinkHref={`${starIcon}#empty-star`} />
        </svg>
    ));

    return (
        <div data-testid="RatingStars" className='flex gap-1'>
            { fullStarIcons }{ halfStarIcon }{ emptyStarIcons }
        </div>
    );
}

export default RatingStars;
