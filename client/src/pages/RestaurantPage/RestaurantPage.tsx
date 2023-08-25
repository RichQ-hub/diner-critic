import './RestaurantPage.css';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { ReviewState } from '../../types/types';
import { reviewsData } from '../../data/reviewsData';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import RestaurantsService from "../../services/RestaurantsService";

import cafeShopImg from '../../assets/images/restaurants/cafe-diner.gif';
import StarRating from '../../components/StarRating/StarRating';

const dummyRestDetails = {
    name: 'Cafe Shop',
    location: 'Alice Springs, Australia',
    img_filename: cafeShopImg,
    description_long: `This course provides a programmer's view on how a computer system executes programs, manipulates data and communicates. It enables students to become effective programmers in dealing with issues of performance, portability, and robustness.\n
    It is typically taken in the term after completing COMP1511, but could be delayed and taken later. It serves as a foundation for later courses on networks, operating systems, computer architecture and compilers, where a deeper understanding of systems-level issues is required.\n
    It is typically taken in the term after completing COMP1511, but could be delayed and taken later. It serves as a foundation for later courses on networks, operating systems, computer architecture and compilers, where a deeper understanding of systems-level issues is required.`,
    num_ratings: 45,
    overall_rating_avg: 2.3,
    food_rating_avg: 2.5,
    service_rating_avg: 1.7,
    atmosphere_rating_avg: 4.9,
}

const dummyAvgRatings = [
    {
        title: 'Food',
        rating: dummyRestDetails.food_rating_avg,
    },
    {
        title: 'Service',
        rating: dummyRestDetails.service_rating_avg,
    },
    {
        title: 'Atmosphere',
        rating: dummyRestDetails.atmosphere_rating_avg,
    },
]

export default function RestaurantPage() {
    const { restaurantId } = useParams();
    const [reviews, setReviews] = useState<ReviewState[]>([]);

    useEffect(() => {
        // Dummy data for now.
        // setReviews(reviewsData);

        async function fetchReviews() {
            const data = await RestaurantsService.getRestaurantReviews(restaurantId as string);
            setReviews(data.reviews);
        }
        fetchReviews();
    }, []);

    return (
        <main className='rest-review-page'>
            <div className='rest-page-content'>
                <section className="rest-summary rest-page--padding">
                    <h1 className='rest-summary__name'>{dummyRestDetails.name}</h1>

                    {/* Num Ratings. */}
                    <div className='rest-summary__num-ratings'>
                        <StarRating rating_overall={dummyRestDetails.overall_rating_avg}/>
                        <p>{`${dummyRestDetails.num_ratings} Ratings`}</p>
                    </div>

                    {/* Location. */}
                    <div className="rest-summary__location">
                        <h3>Location</h3>
                        <p>{dummyRestDetails.location}</p>
                    </div>

                    {/* Restaurant Image. */}
                    <div className="rest-summary__img-wrapper">
                        {/* <img src={imgBorder} className="rest-summary__img-border" /> */}
                        <img src={dummyRestDetails.img_filename} className='rest-summary__img' />
                    </div>

                    {/* Restaurant Average Ratings Section. */}
                    <div className="rest-summary__ratings">
                        {dummyAvgRatings.map((r) => {
                            const { title, rating } = r;
                            return (
                                <div className="rest-summary__avg-rating" key={title}>
                                    <h3>{title}</h3>
                                    <p><span className='avg-rating__value'>{rating}</span>/5</p>
                                </div>
                            )
                        })}
                    </div>

                    {/* Description Section. */}
                    <div className='rest-summary__desc'>
                        <h3>Description</h3>
                        <hr />
                        <p className="display--linebreak">{dummyRestDetails.description_long}</p>
                    </div>
                </section>

                <section className="rest-reviews rest-page--padding">
                    <div className="rest-reviews__list">
                        {reviews.map((review: ReviewState) => {
                            const {
                                id,
                                title,
                                content,
                                rating_overall,
                                rating_food,
                                rating_service,
                                rating_atmosphere,
                                created_at,
                            } = review;

                            return (
                                <ReviewCard 
                                    key={id}
                                    id={id}
                                    title={title}
                                    content={content}
                                    rating_overall={rating_overall}
                                    rating_food={rating_food}
                                    rating_service={rating_service}
                                    rating_atmosphere={rating_atmosphere}
                                    created_at={created_at}
                                />
                            )
                        })}
                    </div>
                </section>
            </div>
        </main>
    )
}
