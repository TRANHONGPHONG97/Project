package com.aso.service.reviews;

import com.aso.exception.DataInputException;
import com.aso.exception.DataOutputException;
import com.aso.model.*;
import com.aso.model.dto.ReviewDTO;
import com.aso.repository.ProductRepository;
import com.aso.repository.ReviewRepository;
import com.aso.service.account.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService{
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Iterable<Review> findAll() {
        return null;
    }

    @Override
    public Optional<Review> findById(Long id) {
        return reviewRepository.findById(id);
    }

    @Override
    public void removeById(Review review) {

    }

    @Override
    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public Review getById(Long id) {
        return null;
    }

    @Override
    public void delete(Product id) {

    }

    @Override
    public Boolean existById(Long id) {
        return null;
    }

    @Override
    public void softDelete(Review review) {
        review.setDeleted(true);
        reviewRepository.save(review);
    }

    @Override
    public Review createReview(ReviewDTO reviewDTO) {
        try {
            Optional<Account> account = accountService.findById(reviewDTO.getAccount().getId());
            if (!account.isPresent ()) {
                throw new DataInputException("Tài khoản không tồn tại!");
            }

            Optional<Product> product = productRepository.findById(reviewDTO.getProduct().getId());
            if (!product.isPresent ()) {
                throw new DataInputException("Sản phẩm không tồn tại!");
            }
            reviewDTO.setAccount(account.get().toAccountDTO());
            reviewDTO.setProduct(product.get().toProductDTO());

            Review review = reviewDTO.toReview();
            Review savedReview = null;

            productRepository.save(product.get());
            review.setCreatedBy(account.get().getCreatedBy());
            review.setProduct(product.get());
            savedReview = reviewRepository.save(review);

            return savedReview;
        } catch (Exception e) {
            throw new DataOutputException ( "Hãy đăng nhập để thực hiện thao tác này" );
        }
    }

    @Override
    public List<ReviewDTO> findAllReviewsDTO() {
        return reviewRepository.findAllReviewsDTO();
    }
}
