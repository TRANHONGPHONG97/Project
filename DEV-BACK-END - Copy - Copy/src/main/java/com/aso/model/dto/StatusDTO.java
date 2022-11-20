package com.aso.model.dto;

import com.aso.model.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class StatusDTO {
    private Long id;

    private String code;

    private String name;

    public Status toStatus() {
        return new Status ()
                .setId ( id )
                .setCode ( code )
                .setName ( name );
    }
}
