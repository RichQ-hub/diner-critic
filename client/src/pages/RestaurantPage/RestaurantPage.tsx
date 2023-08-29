import './RestaurantPage.css';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { RestaurantSummaryState, ReviewState } from '../../types/types';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import RestaurantsService from "../../services/RestaurantsService";
import StarRating from '../../components/StarRating/StarRating';
import ReviewModal from '../../components/ReviewModal/ReviewModal';

export default function RestaurantPage() {
    const { restaurantId } = useParams();
    const [reviews, setReviews] = useState<ReviewState[]>([]);
    const [restaurantDetails, setRestaurantDetails] = useState<RestaurantSummaryState>({} as RestaurantSummaryState);
    const [restaurantImgRef, setRestaurantImgRef] = useState<string>("");
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

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

    function handleToggleModal(bool: boolean) {
        setIsOpenModal(bool);
    }

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

                    {/* Price Range */}
                    {/* <div className="rest-summary__price-range">
                        <h3>Price Range</h3>
                        <p>$$$$$</p>
                    </div> */}

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
                    {/* Review Header. */}
                    <div className="rest-reviews__header">
                        <h3>Reviews</h3>
                        <div className="create-review-btn" onClick={() => handleToggleModal(true)}>
                            <p>Create Review</p>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                        </div>
                    </div>

                    {/* Reviews List. */}
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

            {/* Modal Section. */}
            {isOpenModal && <ReviewModal handleToggleModal={handleToggleModal} />}
        </main>
    )
}
