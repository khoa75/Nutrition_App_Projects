package com.example.backend.exception;

import com.example.backend.dto.response.ApiResponse;
import com.example.backend.enums.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    //exception tự định nghĩa
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse<Object>> handlingAppException(AppException e) {
        ErrorCode errorCode = e.getErrorCode();

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .success(false)
                .message(errorCode.getMessage())
                .build();

        return ResponseEntity.status(errorCode.getHttpStatus()).body(apiResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse<Object>> handlingValidationException(MethodArgumentNotValidException exception) {
        String message = exception.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(fieldError -> fieldError.getDefaultMessage())
                .orElse("Invalid request payload");

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .success(false)
                .message(message)
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
    }

    //các exception chưa được định nghĩa
    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<ApiResponse<Object>> handlingRuntimeException(RuntimeException exception) {
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .success(false)
                .message(ErrorCode.UNCATEGORIZED_ERROR.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
    }
}
