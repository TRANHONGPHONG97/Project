package com.aso.model;

import com.aso.model.dto.ProductMediaDTO;
import lombok.*;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.Date;

@ToString(exclude = "product")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@Table(name = "product_media")
public class ProductMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "file_url")
    private String fileUrl;

    @Column(columnDefinition = "BIGINT(20) DEFAULT 0")
    private Long ts = new Date().getTime();

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public ProductMediaDTO toProductMediaDTO() {
        return new ProductMediaDTO()
                .setId(id)
                .setFileUrl(fileUrl)
                .setProduct(product.toProductDTO())
                .setTs(ts)
                ;
    }
}
