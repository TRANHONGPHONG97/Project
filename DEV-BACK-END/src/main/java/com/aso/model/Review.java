package com.aso.model;

import com.aso.model.dto.ReviewDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "reviews")
@Accessors(chain = true)
public class Review extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    private String review;

    private int vote;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    public ReviewDTO toReviewDTO() {
        return new ReviewDTO()
                .setId(id)
                .setCreatedAt(account.getCreatedAt())
                .setCreatedBy(account.getUsername())
                .setAccount(account.toAccountDTO())
                .setProduct(product.toProductDTO())
                .setReview(review)
                .setVote(vote);
    }
}
