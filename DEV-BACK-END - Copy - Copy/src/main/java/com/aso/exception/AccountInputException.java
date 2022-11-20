package com.aso.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AccountInputException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public AccountInputException(String message) {
        super(message);
    }
}