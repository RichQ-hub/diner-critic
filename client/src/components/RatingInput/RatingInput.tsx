import './RatingInput.css';
import React, { useState } from 'react'
import FormItem from '../FormItem'

interface RatingInputProps {
    title: string;
    pageStyle: string;
    type: 'circle' | 'star';
    maxRating: number;
    selectedRating: number;
    handleChangeRating: (rating: number) => void;
}

const ratingColourClasses = [
    'rating--one',
    'rating--two',
    'rating--three',
    'rating--four',
    'rating--five',
]

export default function RatingInput(props: RatingInputProps) {
    const { 
        title, 
        pageStyle, 
        type, 
        maxRating,
        selectedRating,
        handleChangeRating
    } = props;

    // const [selectedRating, setSelectedRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number>(0);

    return (
        <FormItem
            title={title}
            pageStyle={pageStyle}
        >
            <div className='rating-input-group'>
                {[...Array(maxRating)].map((_, idx) => {
                    return (
                        <button
                            key={idx}
                            type='button'
                            className='rating-input'
                            onClick={(e) => {
                                e.preventDefault();
                                handleChangeRating(idx + 1);
                            }}
                            onMouseEnter={() => {setHoveredRating(idx + 1)}}
                            onMouseLeave={() => setHoveredRating(selectedRating)}
                        >
                            {type === 'circle' ? (
                                /**
                                 * Note: How the colour class is chosen.
                                 * If the hoveredRating != selectedRating, that means that we are hovering 
                                 * over something. We thus set all the selected input circles to the colour
                                 * of the currently hovered element. Otherwise, if we are not hovering over 
                                 * a circle, we set the selected input circles to the colour of the currently
                                 * clicked on rating.
                                 */
                                <div className={`rating-input-circle ${idx + 1 <= (hoveredRating || selectedRating) ? ratingColourClasses[hoveredRating != selectedRating ? hoveredRating - 1 : selectedRating - 1] : 'rating--none'}`}></div>
                            ) : (
                                <svg 
                                    className={`rating-input-star ${idx + 1 <= (hoveredRating || selectedRating) ? 'star-rating-input--on' : 'star-rating-input--off'}`}
                                    xmlns="http://www.w3.org/2000/svg" 
                                    height="1em" 
                                    viewBox="0 0 576 512"
                                >
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                                </svg>
                            )}
                        </button>
                    )
                })}
            </div>
        </FormItem>
    )
}
