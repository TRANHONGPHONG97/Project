package com.aso.model.dto;

import com.aso.model.Account;
import com.aso.model.Product;
import com.aso.model.WatchList;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class WatchListDTO {
    private Long id;

    private AccountDTO account;

    private ProductDTO product;

    private Date createdAt;

    public WatchListDTO(Long id, Account account, Product product, Date createdAt) {
        this.id = id;
        this.account = account.toAccountDTO ();
        this.product = product.toProductDTO ();
        this.createdAt = createdAt;
    }

    public WatchList toWatchList(){
        return new WatchList ()
                .setId ( id )
                .setAccount ( account.toAccount () )
                .setProduct ( product.toProduct () )
                .setCreatedAt ( createdAt );
    }
}
