package com.aso.model.dto;

import com.aso.model.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class RoleDTO {

    private Long id;

    private String code;

    private String name;

    public RoleDTO(Long id, String code, String name) {
        this.id = id;
        this.code = code;
        this.name = name;
    }

    public Role toRole() {
        return new Role ()
                .setId ( id )
                .setCode ( code )
                .setName ( name );
    }
}

