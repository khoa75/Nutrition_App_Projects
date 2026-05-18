package com.example.backend.controller;

import com.example.backend.dto.FoodsDTO;
import jakarta.persistence.NotNull;
import jakarta.persistence.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/foods")
public class FoodsController {

    @Autowired
    private FoodsService foodsService;

    @PostMapping
    public String save(@Valid @RequestBody FoodsVO vO) {
        return foodsService.save(vO).toString();
    }

    @DeleteMapping("/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Long id) {
        foodsService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Long id,
                       @Valid @RequestBody FoodsUpdateVO vO) {
        foodsService.update(id, vO);
    }

    @GetMapping("/{id}")
    public FoodsDTO getById(@Valid @NotNull @PathVariable("id") Long id) {
        return foodsService.getById(id);
    }

    @GetMapping
    public Page<FoodsDTO> query(@Valid FoodsQueryVO vO) {
        return foodsService.query(vO);
    }
}
