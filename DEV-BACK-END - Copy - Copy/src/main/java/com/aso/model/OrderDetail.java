package com.aso.model;


import com.aso.model.dto.OrderDetailDTO;
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
@Table(name = "orders_detail")
@Accessors(chain = true)

@NamedNativeQuery(
        name = "sp_chart",
        query =
                "call sp_chartByMonth(:sYear);",
        resultSetMapping = "result_chartdto"
)
@SqlResultSetMapping(
        name = "result_chartdto",
        classes = @ConstructorResult(
                targetClass = Chart.class,
                columns = {
                        @ColumnResult(name = "id", type = Long.class),
                        @ColumnResult(name = "auction", type = BigDecimal.class),
                        @ColumnResult(name = "buy", type = BigDecimal.class)
                }
        )
)

// turnoverMonth
@NamedNativeQuery(
        name = "sp_turnoverByMonth",
        query =
                "call sp_turnoverByMonth();",
        resultSetMapping = "result_turnoverByMonth"
)
@SqlResultSetMapping(
        name = "result_turnoverByMonth",
        classes = @ConstructorResult(
                targetClass = Chart.class,
                columns = {
                        @ColumnResult(name = "turnoverMonth", type = BigDecimal.class),
                        @ColumnResult(name = "turnoverYear", type = BigDecimal.class)
                }
        )
)

public class OrderDetail extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private Product product;

    @Column(precision = 12, scale = 0, nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private int quantity;

    @Column(precision = 12, scale = 0, nullable = false)
    private BigDecimal amountTransaction;

    @ManyToOne
    @JoinColumn(name = "status_id", referencedColumnName = "id")
    private Status status;

    public OrderDetailDTO toOrderDetailDTO() {
    return new OrderDetailDTO()
            .setId(id)
            .setOrder(order.toOrderDTO ())
            .setProduct(product.toProductDTO ())
            .setPrice(price)
            .setQuantity(quantity)
            .setAmountTransaction(amountTransaction)
            .setStatus (status.toStatusDTO ())
            .setCreatedBy ( getCreatedBy () )
            ;
    }
}
