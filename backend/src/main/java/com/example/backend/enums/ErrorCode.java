package com.example.backend.enums;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
    UNCATEGORIZED_ERROR(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),

    UNAUTHENTICATED(1000, "Đăng nhập thất bại (Sai mật khẩu, token expire)", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(1001, "User not found", HttpStatus.NOT_FOUND),
    USER_ALREADY_EXISTS(1002, "User already exists", HttpStatus.CONFLICT),
    ACCOUNT_LOCKED(1003, "Account is temporarily locked", HttpStatus.LOCKED),
    INVALID_CREDENTIALS(1004, "Invalid credentials", HttpStatus.UNAUTHORIZED),
    INVALID_PASSWORD_STRENGTH(1005, "Password does not meet strength requirements", HttpStatus.BAD_REQUEST),
    FOOD_NOT_FOUND(1006, "Food not found", HttpStatus.NOT_FOUND),
    ;

    private int code;
    private String message;
    private HttpStatus httpStatus;

    ErrorCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }
}
