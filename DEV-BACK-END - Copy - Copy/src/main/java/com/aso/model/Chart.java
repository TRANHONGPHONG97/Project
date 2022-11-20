package com.aso.model;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor


public class Chart {
    private Long id;
    private BigDecimal auction;
    private BigDecimal buy;
    private BigDecimal turnoverMonth;
    private BigDecimal turnoverYear;

    public Chart(Long id, BigDecimal auction, BigDecimal buy) {
        this.id = id;
        this.auction = auction;
        this.buy = buy;
    }

    public Chart(BigDecimal turnoverMonth, BigDecimal turnoverYear) {
        this.turnoverMonth = turnoverMonth;
        this.turnoverYear = turnoverYear;
    }
}
