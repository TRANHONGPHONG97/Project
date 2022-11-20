package com.aso.model.dto;


import com.aso.model.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class CartDTO {

    private Long id;

    private StatusDTO status;

    private AccountDTO account;


    public CartDTO(Long id, Status status, Account account){
        this.id = id;
        this.status = status.toStatusDTO ();
        this.account = account.toAccountDTO();
    }

    public Cart toCart() {
        return new Cart()
                .setId(id)
                .setStatus ( status.toStatus () )
                .setAccount(account.toAccount())
               ;
    }
}
