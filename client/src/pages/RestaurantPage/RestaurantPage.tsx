import './RestaurantPage.css';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { RestaurantSummaryState, ReviewState } from '../../types/types';
import { reviewsData } from '../../data/reviewsData';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import RestaurantsService from "../../services/RestaurantsService";
import StarRating from '../../components/StarRating/StarRating';

export default function RestaurantPage() {
    const { restaurantId } = useParams();
    const [reviews, setReviews] = useState<ReviewState[]>([]);
    const [restaurantDetails, setRestaurantDetails] = useState<RestaurantSummaryState>({} as RestaurantSummaryState);
    const [restaurantImgRef, setRestaurantImgRef] = useState<string>("");

    /**
     * Fetches all the reviews for the current restaurant.
     */
    useEffect(() => {
        async function fetchReviews() {
            const data = await RestaurantsService.getRestaurantReviews(restaurantId as string);
            setReviews(data.reviews);
        }
        fetchReviews();
    }, []);

    /**
     * Fetches the summary data for the current restaurant.
     */
    useEffect(() => {
        async function fetchSummary() {
            const data = await RestaurantsService.getRestaurantDetails(restaurantId as string);
            setRestaurantDetails(data.restaurant);
        }
        fetchSummary();
    }, []);

    /**
     * Loads the image dynamically. This gets run when the restaurantDetails state changes (so it is
     * set as a dependency).
     */
    useEffect(() => {
        async function getRestaurantImg() {
            try {
                const img = await import(`../../assets/storage/${restaurantDetails.img_filename}`);
                // The import() function returns a Module object, and the actual link to
                // the image is stored in the "default" property.
                setRestaurantImgRef(img.default);
            } catch (error) {
                console.log(error);
            }
        }
        getRestaurantImg();
    }, [restaurantDetails]);

    const avgRatings = [
        {
            title: 'Food',
            rating: restaurantDetails.food_rating_avg,
        },
        {
            title: 'Service',
            rating: restaurantDetails.service_rating_avg,
        },
        {
            title: 'Atmosphere',
            rating: restaurantDetails.atmosphere_rating_avg,
        },
    ]

    return (
        <main className='rest-review-page'>
            <div className='rest-page-content'>
                <section className="rest-summary rest-page--padding">
                    <h1 className='rest-summary__name'>{restaurantDetails.name}</h1>

                    {/* Num Ratings. */}
                    <div className='rest-summary__num-ratings'>
                        <StarRating rating_overall={restaurantDetails.overall_rating_avg}/>
                        <p>{`${restaurantDetails.num_reviews} Reviews`}</p>
                    </div>

                    {/* Location. */}
                    <div className="rest-summary__location">
                        <h3>Location</h3>
                        <p>{restaurantDetails.location}</p>
                    </div>

                    {/* Restaurant Image. */}
                    <div className="rest-summary__img-wrapper">
                        {/* <img src={imgBorder} className="rest-summary__img-border" /> */}
                        <img src={restaurantImgRef} className='rest-summary__img' />
                    </div>

                    {/* Restaurant Average Ratings Section. */}
                    <div className="rest-summary__ratings">
                        {avgRatings.map((r) => {
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
                        <p className="display--linebreak">{restaurantDetails.description_long}</p>
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
