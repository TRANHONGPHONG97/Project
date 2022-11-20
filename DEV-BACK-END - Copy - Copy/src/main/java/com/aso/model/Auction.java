package com.aso.model;

import com.aso.model.dto.AuctionDTO;
import com.aso.model.enums.AuctionType;
import com.aso.model.enums.ItemStatus;
import com.aso.service.converter.AuctionTypeConverter;
import com.aso.service.converter.ItemStatusConverter;
import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Table(name="auctions")
@Builder
@EqualsAndHashCode(of = "id")
//@Schema
@Accessors(chain = true)
public class Auction extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

//    @Schema(description = "Auction type")
    @Convert(converter = AuctionTypeConverter.class)
    private AuctionType auctionType;

//    @Schema(description = "Item status")
    @Convert(converter = ItemStatusConverter.class)
    private ItemStatus itemStatus;

    @Column(precision = 12, scale = 0)
    private BigDecimal startingPrice;
    @Column(precision = 12, scale = 0)
    private BigDecimal currentPrice;

    private Date auctionEndTime;

    private Date auctionStartTime;

    private int daysToEndTime;

    @OneToMany(mappedBy = "auction")
    private List<Bid> bids;

    public AuctionDTO toAuctionDTO(){
        return  new AuctionDTO()
                .setId(id)
                .setCreatedAt(getCreatedAt())
                .setCreatedBy(getCreatedBy())
                .setUpdateAt(getUpdatedAt())
                .setUpdateBy(getUpdatedBy())
                .setEmail(email)
                .setAccount(account.toAccountDTO())
                .setProduct(product.toProductDTO())
                .setAuctionType(auctionType)
                .setItemStatus(itemStatus)
                .setStartingPrice(startingPrice)
                .setCurrentPrice(currentPrice)
                .setAuctionEndTime(auctionEndTime)
                .setAuctionStartTime(auctionStartTime)
                .setDaysToEndTime(daysToEndTime)
                ;
    }
}
