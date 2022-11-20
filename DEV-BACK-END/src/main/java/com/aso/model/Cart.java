package com.aso.model;

import com.aso.model.dto.CartDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "carts")
@Accessors(chain = true)
public class Cart extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "status_id", referencedColumnName = "id")
    private Status status;

    @OneToMany(mappedBy = "cart", orphanRemoval = true, targetEntity = CartItem.class, cascade = CascadeType.ALL )
    private List<CartItem> cartItem;

    public CartDTO toCartDTO(){
        return new CartDTO()
                .setId(id)
                .setStatus ( status.toStatusDTO () )
                .setAccount(account.toAccountDTO())
                ;
    }
}
