package com.aso.model;

import com.aso.model.dto.BidDTO;
import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "bids")
@Accessors(chain = true)
public class Bid extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String createdBy;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "auction_id", referencedColumnName = "id")
    private Auction auction;

    private String email;

    @Column(precision = 12, scale = 0)
    private BigDecimal bidPrice;

    @Column(precision = 12, scale = 0, name="estimate_price")
    private BigDecimal estimatePrice = new BigDecimal ( 0L );

    @Column(columnDefinition = "boolean default false")
    private boolean deleted = false;

    public BidDTO toBidDTO(){
        return new BidDTO()
                .setId(id)
                .setCreatedAt(getCreatedAt())
                .setCreatedBy(getCreatedBy())
                .setUpdateAt(getUpdatedAt())
                .setUpdateBy(getUpdatedBy())
                .setEmail(email)
                .setBidPrice(bidPrice)
                .setEstimatePrice(estimatePrice)
                .setAccount(account.toAccountDTO())
                .setAuction(auction.toAuctionDTO())
                .setDeleted(deleted)
                ;
    }
}
