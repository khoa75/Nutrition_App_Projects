package com.example.backend.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/foods")
public class FoodsController {
    //create food (admin): không cần thêm FK user_id

    //create food (user): thêm FK user_id

    //get all food

    //get by id

    //update

    //delete
}
