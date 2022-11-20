package com.aso.model.dto;


import com.aso.model.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class OrderDTO {

    private Long id;

    @NotEmpty(message = "Hãy nhập họ và tên")
    private String fullName;
    @NotEmpty(message = "Hãy nhập số điện thoại")
    @Pattern ( regexp = "^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$", message = "Số điện thoại không đúng")
    private String phone;
    @NotEmpty(message = "Hãy nhập email")
    @Pattern ( regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Email không hợp lệ")
    private String email;
    private LocationRegionDTO locationRegion;
    private String description;
    private AccountDTO account;
    private StatusDTO status;

    private OrderDetailDTO orderDetail;

    private String createdBy;

    public OrderDTO(Long id, String fullName, String phone, String email, LocationRegion locationRegion, String description, Account account, Status status, String createdBy) {
        this.id = id;
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.locationRegion = locationRegion.toLocationRegionDTO ();
        this.description = description;
        this.account = account.toAccountDTO ();
        this.status = status.toStatusDTO ();
        this.createdBy = createdBy;
    }

    public Order toOrder() {
        return (Order) new Order ()
                .setId ( id )
                .setFullName ( fullName )
                .setPhone ( phone )
                .setEmail ( email )
                .setLocationRegion ( locationRegion.toLocationRegion () )
                .setDescription ( description )
                .setAccount ( account.toAccount () )
                .setStatus ( status.toStatus () )
                .setCreatedBy ( createdBy )
                ;

    }
}
