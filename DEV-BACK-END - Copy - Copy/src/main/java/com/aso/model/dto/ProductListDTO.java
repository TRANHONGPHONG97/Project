package com.aso.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductListDTO {

    private Long id;
    private String title;
    private String slug;
    private String image;
    private BigDecimal price;
}
