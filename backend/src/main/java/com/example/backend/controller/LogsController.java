package com.example.backend.controller;

import com.example.backend.dto.LogsDTO;
import jakarta.persistence.NotNull;
import jakarta.persistence.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/logs")
public class LogsController {

    @Autowired
    private LogsService logsService;

    @PostMapping
    public String save(@Valid @RequestBody LogsVO vO) {
        return logsService.save(vO).toString();
    }

    @DeleteMapping("/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Long id) {
        logsService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Long id,
                       @Valid @RequestBody LogsUpdateVO vO) {
        logsService.update(id, vO);
    }

    @GetMapping("/{id}")
    public LogsDTO getById(@Valid @NotNull @PathVariable("id") Long id) {
        return logsService.getById(id);
    }

    @GetMapping
    public Page<LogsDTO> query(@Valid LogsQueryVO vO) {
        return logsService.query(vO);
    }
}
