package com.aso.model.dto;

import com.aso.model.Account;
import com.aso.model.Auction;
import com.aso.model.BaseEntity;
import com.aso.model.Product;
import com.aso.model.enums.AuctionType;
import com.aso.model.enums.ItemStatus;
import com.aso.utils.PriceConstraint;
//import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.math.BigDecimal;
import java.util.Date;

import static com.aso.utils.AppConstants.MAX_AUCTION_LENGTH_IN_DAYS;
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class AuctionDTO extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date createdAt;

    private String createdBy;

    private Date updateAt;

    private String updateBy;

    @Email(regexp = "[^@]+@[^@]+\\.[^@.]+", message = "Email không hợp lệ!")
    private String email;

    private AccountDTO account;

    private ProductDTO product;

    private AuctionType auctionType;

    private ItemStatus itemStatus;

    @PriceConstraint
//    @Schema(example = "1.00")
    private BigDecimal startingPrice;

    private BigDecimal currentPrice;

    private Date auctionEndTime;

    private Date auctionStartTime;

    @Min(value = 1, message = "Thời gian kết thúc phiên đấu giá phải được cung cấp!")
    @Max(value = MAX_AUCTION_LENGTH_IN_DAYS, message = "Thời gian kết thúc phiên đấu giá không thể dài hơn" + MAX_AUCTION_LENGTH_IN_DAYS)
    private int daysToEndTime;

    public AuctionDTO(Long id, Date createdAt, String createdBy, Date updateAt, String updateBy, String email, Account account, Product product, AuctionType auctionType, ItemStatus itemStatus, BigDecimal startingPrice, BigDecimal currentPrice, Date auctionEndTime, Date auctionStartTime, int daysToEndTime) {
        this.id = id;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.updateAt = updateAt;
        this.updateBy = updateBy;
        this.email = email;
        this.account = account.toAccountDTO();
        this.product = product.toProductDTO();
        this.auctionType = auctionType;
        this.itemStatus = itemStatus;
        this.startingPrice = startingPrice;
        this.currentPrice = currentPrice;
        this.auctionEndTime = auctionEndTime;
        this.auctionStartTime = auctionStartTime;
        this.daysToEndTime = daysToEndTime;
    }

    public Auction toAuction(){
        return (Auction) new Auction()
                .setId(id)
                .setEmail(email)
                .setAccount(account.toAccount())
                .setProduct(product.toProduct())
                .setAuctionType(auctionType)
                .setItemStatus(itemStatus)
                .setStartingPrice(startingPrice)
                .setCurrentPrice(currentPrice)
                .setAuctionEndTime(auctionEndTime)
                .setAuctionStartTime(auctionStartTime)
                .setDaysToEndTime(daysToEndTime)
                .setCreatedAt(getCreatedAt())
                .setCreatedBy(getCreatedBy())
                .setUpdatedAt(getUpdatedAt())
                .setUpdatedBy(getUpdatedBy())
                ;

    }
}
