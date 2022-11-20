package com.aso.utils;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

import static com.aso.utils.AppConstants.MAX_PRICE;


@Documented
@Constraint(validatedBy = PriceConstraintValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface PriceConstraint {
    String message() default "Giá phải lớn hơn 0 và nhỏ hơn " + MAX_PRICE;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
