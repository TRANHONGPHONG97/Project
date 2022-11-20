package com.aso.controller.api;

import com.aso.exception.DataInputException;
import com.aso.exception.ResourceNotFoundException;
import com.aso.model.Review;
import com.aso.model.dto.ReviewDTO;
import com.aso.service.reviews.ReviewService;
import com.aso.utils.AppUtil;
import com.aso.utils.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
public class ReviewAPI {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private AppUtil appUtils;
    @Autowired
    private Validation validation;

    @GetMapping("")
    private ResponseEntity<?> getAllReviews() {
        try {
            List<ReviewDTO> reviewDTOList = reviewService.findAllReviewsDTO();
            return new ResponseEntity<>(reviewDTOList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<?> getReviewById(@PathVariable String reviewId) {
        if (!validation.isIntValid(reviewId)) {
            throw new DataInputException("Không tồn tại đánh giá");
        }
        Long review_id = Long.parseLong(reviewId);
        Optional<Review> reviewOptional = reviewService.findById(review_id);
        if (!reviewOptional.isPresent ()) {
            throw new ResourceNotFoundException("Không tồn tại đánh giá!");
        }
        return new ResponseEntity<>(reviewOptional.get().toReviewDTO(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> doCreateReview(
            @RequestBody @Valid ReviewDTO reviewDTO) {
        return new ResponseEntity<>(reviewService.createReview(reviewDTO).toReviewDTO(), HttpStatus.CREATED);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> doEditReview(@PathVariable Long id, @Validated @RequestBody ReviewDTO reviewDTO,
                                    BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return appUtils.mapErrorToResponse(bindingResult);
        }
        Optional<Review> review = reviewService.findById(id);
        if (!review.isPresent ()) {
            return new ResponseEntity<>("Không tìm thấy đánh giá!", HttpStatus.NOT_FOUND);
        }
        try {
            review.get().setUpdatedAt(new Date());
            review.get().setReview(reviewDTO.getReview());
            review.get().setVote(reviewDTO.getVote());
            Review newReview = reviewService.save(review.get());
            return new ResponseEntity<>(newReview.toReviewDTO(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi của hệ thống!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/delete-soft/{id}")
    public ResponseEntity<?> doDeleteReview(@PathVariable Long id) {
        Optional<Review> optionalReview = reviewService.findById(id);
        if (optionalReview.isPresent()) {
            reviewService.softDelete(optionalReview.get());
            return new ResponseEntity<>("Đã xóa thành công!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Xóa thất bại!", HttpStatus.BAD_REQUEST);
        }
    }
}
