package com.aso.model.dto;

import com.aso.model.Cart;
import com.aso.model.CartItem;
import com.aso.model.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.Column;
import java.math.BigDecimal;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class CartItemDTO {

    private Long id;

    @Column(name = "product_id")
    private ProductDTO product;

    private String title;

    private BigDecimal price;

    private int quantity;

    private BigDecimal amountTransaction;

    private CartDTO cart;

    public CartItemDTO(Long id, Product product, String title, BigDecimal price, int quantity, BigDecimal amountTransaction) {
        this.id = id;
        this.product = product.toProductDTO ();
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        this.amountTransaction = amountTransaction;
    }

    public CartItem toCartItem() {
        return new CartItem()
                .setId(id)
                .setCart ( cart.toCart () )
                .setProduct(product.toProduct())
                .setTitle(title)
                .setPrice(price)
                .setQuantity(quantity)
                .setAmountTransaction(amountTransaction)
                ;
    }
}
