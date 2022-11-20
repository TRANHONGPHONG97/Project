package com.aso.utils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.math.BigDecimal;

import static com.aso.utils.AppConstants.MAX_PRICE;

public class PriceConstraintValidator implements ConstraintValidator<PriceConstraint, BigDecimal> {

    @Override
    public void initialize(PriceConstraint constraintAnnotation) { }

    @Override
    public boolean isValid(BigDecimal bigDecimal,
                           ConstraintValidatorContext constraintValidatorContext) {
        return bigDecimal != null && bigDecimal.compareTo(BigDecimal.ZERO) > 0 && bigDecimal.compareTo(BigDecimal.valueOf(
                MAX_PRICE)) < 0
                && bigDecimal.scale() <= 2;
    }

}
