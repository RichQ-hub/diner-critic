import { ReviewState } from "../types/types";


export default function sortReviews(reviews: ReviewState[], selectedSortOption: string): ReviewState[] {
    const sortedReviews = reviews;

    switch (selectedSortOption) {
        case "Most Recent":
            sortedReviews.sort((r1: ReviewState, r2: ReviewState) => {
                return Date.parse(r2.created_at) - Date.parse(r1.created_at);
            })
            break;
        case "Highest Rated":
            sortedReviews.sort((r1: ReviewState, r2: ReviewState) => {
                return r2.rating_overall - r1.rating_overall;
            })
            break;
        case "Lowest Rated":
            sortedReviews.sort((r1: ReviewState, r2: ReviewState) => {
                return r1.rating_overall - r2.rating_overall;
            })
            break;
        default:
            break;
    }

    return sortedReviews;
}