package com.aso.model.dto;

import com.aso.model.Order;
import com.aso.model.OrderDetail;
import com.aso.model.Product;
import com.aso.model.Status;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class OrderDetailDTO {
    private Long id;
    private OrderDTO order;
    private ProductDTO product;
    private BigDecimal price;
    private int quantity;
    private BigDecimal amountTransaction;

    private StatusDTO status;

    private String createdBy;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm", timezone = "Asia/Ho_Chi_Minh")
    private Date createdAt;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm", timezone = "Asia/Ho_Chi_Minh")
    private Date updatedAt;

    public OrderDetailDTO(Long id, Order order, Product product, BigDecimal price, int quantity, BigDecimal amountTransaction, Status status, Date createdAt, Date updatedAt) {
        this.id = id;
        this.order = order.toOrderDTO ();
        this.product = product.toProductDTO ();
        this.price = price;
        this.quantity = quantity;
        this.amountTransaction = amountTransaction;
        this.status = status.toStatusDTO ();
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public OrderDetail toOrderDetail(){
        return (OrderDetail) new OrderDetail()
                .setId(id)
                .setOrder(order.toOrder ())
                .setProduct(product.toProduct ())
                .setPrice(price)
                .setQuantity(quantity)
                .setAmountTransaction(amountTransaction)
                .setStatus (status.toStatus ())
                .setCreatedBy ( createdBy )
                ;
    }
}
