import { ReviewState } from "../types/types";

export const reviewsData: ReviewState[] = [
    {
        review_id: '1',
        restaurant_id: '1',
        title: "Amazing",
        content: "I don’t know what it is, but the atmosphere here is amazing. The waiters are all very patient and well trained. The seafood dishes I ordered were presented in perfection. Can’t recommend this place enough!!",
        rating_overall: 4,
        rating_food: 1,
        rating_service: 2,
        rating_atmosphere: 3,
        created_at: '2023-03-07',
    },
    {
        review_id: '2',
        restaurant_id: '1',
        title: "Quite Good",
        content: `I don’t know what it is, but the atmosphere here is amazing. The waiters are all very patient and well trained. The seafood dishes I ordered were presented in perfection. Can’t recommend this place enough!! \n
        I don’t know what it is, but the atmosphere here is amazing. The`,
        rating_overall: 4,
        rating_food: 4,
        rating_service: 5,
        rating_atmosphere: 1,
        created_at: '2023-08-20',
    },
    {
        review_id: '3',
        restaurant_id: '1',
        title: "Worst Customer Service EVERR.",
        content: "I don’t know what it is, but the atmosphere here is amazing. The waiters are all very patient and well trained. The seafood dishes I ordered were presented in perfection. Can’t recommend this place enough!!",
        rating_overall: 5,
        rating_food: 2,
        rating_service: 1,
        rating_atmosphere: 5,
        created_at: '2009-12-24',
    },
]

/**
 * How you parse a string to date object:
 *      const nice = new Date('2023-08-24');
 */


