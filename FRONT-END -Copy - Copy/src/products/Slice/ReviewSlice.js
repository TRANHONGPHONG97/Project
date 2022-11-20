const initState = {
    reloadReviews: false,
    reviews: [],
    idReview: 0,
    rating: 0,
};

const reviewsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'reviews/setReviews':
            return {
                ...state,
                reviews: action.payload,
            };
        case 'reviews/setReloadReviews':
            return {
                ...state,
                reloadReviews: action.payload,
            };
        case 'reviews/setReviewId':
            return {
                ...state,
                idReview: action.payload,
            };
        case 'reviews/setRating':
            return {
                ...state,
                rating: action.payload,
            };
        default:
            return state;
    }
};

export default reviewsReducer;
