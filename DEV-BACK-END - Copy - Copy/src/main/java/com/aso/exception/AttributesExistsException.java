package com.aso.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class AttributesExistsException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public AttributesExistsException(String message) {
        super(message);
    }
}
