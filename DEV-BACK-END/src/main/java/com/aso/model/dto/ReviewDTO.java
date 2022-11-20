package com.aso.model.dto;

import com.aso.model.Account;
import com.aso.model.Product;
import com.aso.model.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class ReviewDTO {
    private Long id;

    private AccountDTO account;

    private ProductDTO product;

    private String review;

    @Min(value = 1)
    @Max(value = 5)
    private int vote;

    private Date createdAt;
    private String createdBy;

    private boolean deleted = false;

    public ReviewDTO(Long id, Account account, Product product, String review, int vote, Date createdAt, String createdBy, boolean deleted) {
        this.id = id;
        this.account = account.toAccountDTO();
        this.product = product.toProductDTO();
        this.review = review;
        this.vote = vote;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.deleted = deleted;
    }

    public Review toReview() {
        return (Review) new Review()
                .setId (id)
                .setAccount(account.toAccount())
                .setProduct(product.toProduct())
                .setReview(review)
                .setVote(vote)
                .setCreatedBy(account.getCreatedBy());
    }
}
