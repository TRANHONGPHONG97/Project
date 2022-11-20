package com.aso.model.dto;

import com.aso.model.Account;
import com.aso.model.LocationRegion;
import com.aso.model.Role;
import lombok.*;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class AccountDTO {
    private Long id;
    private Date createdAt;
    private String createdBy;
    private Date updatedAt;
    private String updatedBy;
    @NotBlank(message = "username not blank")
    @Size(min = 8, max = 20, message = "Username size between 8 and 20")
    private String username;
    @Size(min = 5, max = 30, message = "Full name size between 5 and 30")
    private String fullName;
    @Size(min = 5, max = 30,  message = "Email size between 5 and 30")
    private String email;
    private String phone;
    @Size(min = 8, max = 20,  message = "Password size between 8 and 20")
    private String password;
    private boolean blocked;
    private String avatar;
    private BigDecimal surplus;
    private RoleDTO role;
    private LocationRegionDTO locationRegion;

    public AccountDTO(Long id, String username, String fullName, String email, String phone, boolean blocked, String avatar, BigDecimal surplus, Role role, LocationRegion locationregion) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.blocked = blocked;
        this.avatar = avatar;
        this.surplus = surplus;
        this.role = role.toRoleDTO();
        this.locationRegion = locationregion.toLocationRegionDTO();
    }

    public AccountDTO(Long id, String username, String fullName, String email, String phone, String password, boolean blocked, String avatar, BigDecimal surplus, Role role, LocationRegion locationregion) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.blocked = blocked;
        this.avatar = avatar;
        this.surplus = surplus;
        this.role = role.toRoleDTO();
        this.locationRegion = locationregion.toLocationRegionDTO();
    }

    public AccountDTO(Long id, String username, String fullName, String email, String phone, String avatar, BigDecimal surplus, boolean blocked, LocationRegion locationregion) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.avatar = avatar;
        this.surplus = surplus;
        this.blocked = blocked;
        this.locationRegion = locationregion.toLocationRegionDTO ();
    }

    public AccountDTO(Long id, Date createdAt, String createdBy, Date updatedAt, String updatedBy, String username, String fullName, String email, String phone, String password, boolean blocked, String avatar, BigDecimal surplus, Role role, LocationRegion locationregion) {
        this.id = id;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.updatedAt = updatedAt;
        this.updatedBy = updatedBy;
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.blocked = blocked;
        this.avatar = avatar;
        this.surplus = surplus;
        this.role = role.toRoleDTO();
        this.locationRegion = locationregion.toLocationRegionDTO();
    }

    public AccountDTO(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    public Account toAccount() {
        return (Account) new Account()
                .setId(id)
                .setUsername(username)
                .setPassword(password)
                .setFullName ( fullName )
                .setEmail ( email )
                .setPhone ( phone )
                .setAvatar ( avatar )
                .setSurplus(surplus)
                .setRole ( role.toRole () )
                .setLocationRegion ( locationRegion.toLocationRegion () )
                .setCreatedAt(getCreatedAt())
                .setCreatedBy(getCreatedBy())
                .setUpdatedAt(getUpdatedAt())
                .setUpdatedBy(getUpdatedBy())
                ;
    }

    public Account toAccountAllAttribute() {
        return (Account) new Account()
                .setId(id)
                .setUsername(username)
                .setPassword(password)
                .setFullName ( fullName )
                .setEmail ( email )
                .setPhone ( phone )
                .setAvatar ( avatar )
                .setSurplus(surplus)
                .setRole ( role.toRole () )
                .setLocationRegion ( locationRegion.toLocationRegion () )
                .setCreatedAt(getCreatedAt())
                .setCreatedBy(getCreatedBy())
                .setUpdatedAt(getUpdatedAt())
                .setUpdatedBy(getUpdatedBy())
                ;
    }

    public LocationRegion toLocationRegion() {
        return new LocationRegion()
                .setId(id)
                .setProvinceId(locationRegion.getProvinceId())
                .setProvinceName(locationRegion.getProvinceName())
                .setDistrictId(locationRegion.getDistrictId())
                .setDistrictName(locationRegion.getDistrictName())
                .setWardId(locationRegion.getWardId())
                .setWardName(locationRegion.getWardName())
                .setAddress(locationRegion.getAddress());
    }
}

