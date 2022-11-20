package com.aso.model;

import com.aso.model.dto.StatusDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "status")
@Accessors(chain = true)
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    private String name;

    @OneToMany(mappedBy = "status")
    private List<Cart> carts;

    @OneToMany(mappedBy = "status")
    private List<Order> orders;

    @OneToMany(mappedBy = "status")
    private List<OrderDetail> orderDetails;

    public StatusDTO toStatusDTO() {
        return new StatusDTO ()
                .setId ( id )
                .setCode ( code )
                .setName ( name );
    }
}
