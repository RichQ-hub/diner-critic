import React from 'react'

interface ReviewCardRatingProps {
    title: string;
    rating: number;
}

const ratingColourClasses = [
    'rating--one',
    'rating--two',
    'rating--three',
    'rating--four',
    'rating--five',
]

export default function ReviewCardRating(props: ReviewCardRatingProps) {
    const { title, rating } = props;

    return (
        <div className='review-card__rating'>
            <h4>{title}</h4>
            <div className="review-card__rating-circles-wrapper">
                {/* This simply creates an empty array. */}
                {Array(5).fill(null).map((_, idx) => {
                    const currIdx = idx + 1;
                    let ratingColour = 'rating--none';

                    if (idx + 1 <= rating) {
                        ratingColour = ratingColourClasses[rating - 1];
                    }

                    return (
                        <div className={`review-card__rating-circle ${ratingColour}`}></div>
                    )
                })}
            </div>
        </div>
    )
}
