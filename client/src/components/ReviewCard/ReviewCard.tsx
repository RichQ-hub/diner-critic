import React from 'react'
import ReviewCardRating from './ReviewCardRating';

import './ReviewCard.css';

interface ReviewCardProps {
    id: string;
    restaurant_id: string;
    title: string;
    content: string;
    rating_overall: number;
    rating_food: number;
    rating_service: number;
    rating_atmosphere: number;
    created_at: string;
}

export default function ReviewCard(props: ReviewCardProps) {
    const {
        id,
        restaurant_id,
        title,
        content,
        rating_overall,
        rating_food,
        rating_service,
        rating_atmosphere,
        created_at
    } = props;

    const postedDate = new Date(created_at);

    const ratings = [
        {
            title: 'Food',
            rating: rating_food,
        },
        {
            title: 'Service',
            rating: rating_service,
        },
        {
            title: 'Atmosphere',
            rating: rating_atmosphere,
        }
    ]

    return (
        <div className='review-card'>
            {/* Header Section. */}
            <div className='review-card__header'>
                <h3>{title}</h3>
                <div className='review-card__date-wrapper'>
                    <p className='review-card__date'>{`${postedDate.getDate()}/${postedDate.getMonth() + 1}/${postedDate.getFullYear()}`}</p>
                </div>
            </div>

            {/* Ratings Section. */}
            <div className='review-card__ratings-wrapper'>
                {ratings.map((r) => {
                    const { title, rating } = r;
                    return (
                        <ReviewCardRating 
                            title={title}
                            rating={rating}
                        />
                    )
                })}
            </div>

            {/* Content Section. */}
            <div className='review-card__content display--linebreak'>
                {content}
            </div>
        </div>
    )
}
