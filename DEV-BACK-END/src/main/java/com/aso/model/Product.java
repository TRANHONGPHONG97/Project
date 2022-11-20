package com.aso.model;



import com.aso.model.dto.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "products")
@Accessors(chain = true)
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String title;
    @NotNull
    private String slug;
    @NotNull
    private String image;
    @NotNull
    private Long sold = 0L;
    @NotNull
    private Long viewed = 0L;

    @NotNull
    private Boolean action;

    @NotNull
    private Long available;

    @NotNull
    @Column(precision = 12, scale = 0)
    private BigDecimal price = new BigDecimal ( 0L );

    @Column(precision = 12, scale = 0, name="estimate_price")
    private BigDecimal estimatePrice = new BigDecimal ( 0L );

    @Column(name = "countday")
    private String countday;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
    private Category category;

    @NotNull
    private String description;

    @Column(precision = 12, scale = 0)
    private BigDecimal cheatMoney;

    @Column(columnDefinition = "boolean default false")
    private Boolean moderation = false;

    @OneToMany(mappedBy = "product")
    private Set<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "product")
    private Set<CartItem> cartItems;

    @OneToMany(mappedBy = "product")
    private Set<ProductMedia> productMedia;

    @OneToMany(mappedBy = "product")
    private  Set<Auction> auctions;

    @OneToMany(mappedBy = "product")
    private  Set<WatchList> watchLists;

    @OneToMany(mappedBy = "product")
    private  Set<Review> reviews;
    
    public ProductDTO toProductDTO() {
        return new ProductDTO ()
                .setId ( id )
                .setCreatedAt(getCreatedAt())
                .setCreatedBy(getCreatedBy())
                .setUpdateAt(getUpdatedAt())
                .setUpdateBy(getUpdatedBy())
                .setTitle ( title )
                .setSlug ( slug )
                .setImage ( image )
                .setSold ( sold )
                .setViewed ( viewed )
                .setPrice ( price )
                .setEstimatePrice(estimatePrice)
                .setCategory ( category.toCategoryDTO () )
                .setDescription(description)
                .setModeration(moderation)
                .setAvailable(available)
                .setAction(action)
                .setCountday(countday)
                .setCheatMoney(cheatMoney)
                ;
    }
}
