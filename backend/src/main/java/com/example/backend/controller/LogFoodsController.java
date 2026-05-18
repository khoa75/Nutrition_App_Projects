package com.example.backend.controller;

import com.example.backend.dto.LogFoodsDTO;
import jakarta.persistence.NotNull;
import jakarta.persistence.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/logFoods")
public class LogFoodsController {

    @Autowired
    private LogFoodsService logFoodsService;

    @PostMapping
    public String save(@Valid @RequestBody LogFoodsVO vO) {
        return logFoodsService.save(vO).toString();
    }

    @DeleteMapping("/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Long id) {
        logFoodsService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Long id,
                       @Valid @RequestBody LogFoodsUpdateVO vO) {
        logFoodsService.update(id, vO);
    }

    @GetMapping("/{id}")
    public LogFoodsDTO getById(@Valid @NotNull @PathVariable("id") Long id) {
        return logFoodsService.getById(id);
    }

    @GetMapping
    public Page<LogFoodsDTO> query(@Valid LogFoodsQueryVO vO) {
        return logFoodsService.query(vO);
    }
}
