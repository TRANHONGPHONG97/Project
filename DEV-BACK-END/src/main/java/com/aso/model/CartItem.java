package com.aso.model;


import com.aso.model.dto.CartItemDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.math.BigDecimal;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "cart_items")
@Accessors(chain = true)
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    private String title;

    @Column(precision = 12, scale = 0, nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "amount_transaction", precision = 12, scale = 0, nullable = false)
    private BigDecimal amountTransaction;

    @ManyToOne
    @JoinColumn(name = "cart_id", referencedColumnName = "id", nullable = false)
    private Cart cart;

    @Column(columnDefinition = "boolean default false")
    private boolean deleted;

    public CartItemDTO toCartItemListDTO() {
        return new CartItemDTO ()
                .setId(id)
                .setCart ( cart.toCartDTO () )
                .setProduct (product.toProductDTO ())
                .setTitle(title)
                .setPrice(price)
                .setQuantity(quantity)
                .setAmountTransaction(amountTransaction);

    }
}
