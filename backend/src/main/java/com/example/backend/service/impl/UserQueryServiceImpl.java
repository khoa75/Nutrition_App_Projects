package com.example.backend.service.impl;

import com.example.backend.dto.response.UserResponse;
import com.example.backend.entity.Users;
import com.example.backend.enums.UserStatus;
import com.example.backend.repository.UsersRepository;
import com.example.backend.service.UserQueryService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserQueryServiceImpl implements UserQueryService {

    private final UsersRepository usersRepository;

    public UserQueryServiceImpl(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public List<UserResponse> searchUsers(String email, UserStatus status) {
        Specification<Users> specification = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (email != null && !email.isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("email")), "%" + email.trim().toLowerCase() + "%"));
            }

            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return usersRepository.findAll(specification).stream()
                .map(this::toResponse)
                .toList();
    }

    private UserResponse toResponse(Users user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .status(user.getStatus())
                .build();
    }
}
