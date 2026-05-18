package com.example.backend.controller;

import com.example.backend.dto.UsersDTO;
import jakarta.persistence.NotNull;
import jakarta.persistence.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @PostMapping
    public String save(@Valid @RequestBody UsersVO vO) {
        return usersService.save(vO).toString();
    }

    @DeleteMapping("/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Long id) {
        usersService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Long id,
                       @Valid @RequestBody UsersUpdateVO vO) {
        usersService.update(id, vO);
    }

    @GetMapping("/{id}")
    public UsersDTO getById(@Valid @NotNull @PathVariable("id") Long id) {
        return usersService.getById(id);
    }

    @GetMapping
    public Page<UsersDTO> query(@Valid UsersQueryVO vO) {
        return usersService.query(vO);
    }
}
