package com.aso.repository;

import com.aso.model.Review;
import com.aso.model.dto.ReviewDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT NEW com.aso.model.dto.ReviewDTO (" +
            "r.id, " +
            "r.account, " +
            "r.product, " +
            "r.review, " +
            "r.vote, " +
            "r.createdAt, " +
            "r.createdBy, " +
            "r.deleted)  " +
            "FROM Review r  WHERE r.deleted = false ")
    List<ReviewDTO> findAllReviewsDTO();
}
