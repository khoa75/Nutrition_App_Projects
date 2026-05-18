package com.example.backend.dto;


import lombok.Data;

import java.io.Serializable;

@Data
public class LogFoodsDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long logId;

    private Long foodId;

}
