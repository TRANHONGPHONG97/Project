package com.aso.model;

import com.aso.model.dto.WatchListDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "watch_list_items")
@Accessors(chain = true)
public class WatchList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdAt;

    public WatchListDTO toWatchListDTO() {
        return new WatchListDTO ()
                .setId ( id )
                .setAccount ( account.toAccountDTO () )
                .setProduct ( product.toProductDTO () )
                .setCreatedAt ( createdAt );
    }
}
