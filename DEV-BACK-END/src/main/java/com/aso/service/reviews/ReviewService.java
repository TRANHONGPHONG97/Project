package com.aso.service.reviews;

import com.aso.model.Review;
import com.aso.model.dto.ReviewDTO;
import com.aso.service.IGeneralService;

import java.util.List;

public interface ReviewService extends IGeneralService<Review> {
    Review createReview(ReviewDTO reviewDTO);
    List<ReviewDTO> findAllReviewsDTO();
}
