package com.aso.model.dto;

import com.aso.model.BaseEntity;
import com.aso.model.Category;
import com.aso.model.Product;
import com.aso.model.ProductMedia;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.data.jpa.repository.Query;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class ProductDTO extends BaseEntity implements Validator {
    private Long id;
    private Date createdAt;
    private String createdBy;
    private Date updateAt;
    private String updateBy;
    private Boolean action;
    @Max(value = 1000)
    @Min(value = 0)
    private Long available;
    private String image;
    private Boolean moderation;
    private BigDecimal price;
    private BigDecimal estimatePrice;
    private String slug;
    private Long sold;
    private String title;
    private Long viewed;
    private CategoryDTO category;
    private String description;
    private String countday;
    private BigDecimal cheatMoney;

    private List<String> images;


    public ProductDTO(Long id, String title, String slug, String image, BigDecimal price, BigDecimal estimatePrice, Long sold, Long viewed, Category category, Long available, String description, boolean action){

        this.id = id;
        this.title = title;
        this.slug = slug;
        this.image = image;
        this.price = price;
        this.estimatePrice = estimatePrice;
        this.sold = sold;
        this.viewed = viewed;
        this.category = category.toCategoryDTO ();
        this.available = available;
        this.description = description;
        this.action = action;
    }

    public ProductDTO(Long id, Date createdAt, String createdBy, Date updateAt, String updateBy, Boolean action, Long available, String image, Boolean moderation, BigDecimal price, BigDecimal estimatePrice, String slug, Long sold, String title, Long viewed, Category category, String description, String countday, BigDecimal cheatMoney) {
        this.id = id;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.updateAt = updateAt;
        this.updateBy = updateBy;
        this.action = action;
        this.available = available;
        this.image = image;
        this.moderation = moderation;
        this.price = price;
        this.estimatePrice = estimatePrice;
        this.slug = slug;
        this.sold = sold;
        this.title = title;
        this.viewed = viewed;
        this.category = category.toCategoryDTO();
        this.description = description;
        this.countday = countday;
        this.cheatMoney = cheatMoney;
    }

    public Product toProduct() {
        return (Product) new Product ()
                .setId ( id )
                .setTitle ( title )
                .setSlug ( slug )
                .setPrice ( price )
                .setEstimatePrice(estimatePrice)
                .setSold ( sold )
                .setViewed ( viewed )
                .setImage ( image )
                .setDescription(description)
                .setAvailable(available)
                .setCountday(countday)
                .setCheatMoney(cheatMoney)
                .setAction(action)
                .setCategory ( category.toCategory () )
                .setCreatedAt(getCreatedAt())
                .setCreatedBy(getCreatedBy())
                .setUpdatedAt(getUpdatedAt())
                .setUpdatedBy(getUpdatedBy())
                ;

    }

    public ProductDTO(String slug) {
        this.slug = slug;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return ProductDTO.class.isAssignableFrom ( clazz );
    }


    @Override
    public void validate(Object o, Errors errors) {
        ProductDTO productDTO = (ProductDTO) o;
        String price = productDTO.getPrice ().toString ();


        if ( !com.aso.utils.Validation.isNumberValid ( price ) ) {

            if ( price == null || price.equals ( "" ) ) {
                errors.rejectValue ( "price", "400", "Price not null!" );
            } else {
                errors.rejectValue ( "price", "400", "Price invalid!" );
            }

        } else {
            if ( price.length () > 9 ) {
                errors.rejectValue ( "price", "400", "Max price is 100.000.000đ!" );
            } else {

                long validPrice = Long.parseLong ( price );
                if ( validPrice < 99999 ) {
                    errors.rejectValue ( "price", "400", "Min price is 100.000đ!" );
                }

                if ( validPrice > 100000000 ) {
                    errors.rejectValue ( "price", "400", "Max price is 100.000.000đ!" );
                }
            }
        }
    }
}
