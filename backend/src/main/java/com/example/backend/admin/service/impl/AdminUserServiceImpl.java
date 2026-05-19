package com.example.backend.admin.service.impl;

import com.example.backend.admin.dto.response.AdminUserStatusUpdateResponse;
import com.example.backend.admin.dto.response.AdminUserSummaryResponse;
import com.example.backend.admin.entity.AuditLog;
import com.example.backend.admin.repository.AuditLogRepository;
import com.example.backend.admin.service.AdminUserService;
import com.example.backend.entity.Users;
import com.example.backend.enums.ErrorCode;
import com.example.backend.enums.UserStatus;
import com.example.backend.enums.WeightGoal;
import com.example.backend.exception.AppException;
import com.example.backend.repository.UsersRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class AdminUserServiceImpl implements AdminUserService {

    private final UsersRepository usersRepository;
    private final AuditLogRepository auditLogRepository;

    public AdminUserServiceImpl(UsersRepository usersRepository, AuditLogRepository auditLogRepository) {
        this.usersRepository = usersRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AdminUserSummaryResponse> getUsers(String search, UserStatus status, WeightGoal goal, int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.max(size, 1));

        Specification<Users> specification = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (search != null && !search.isBlank()) {
                String keyword = "%" + search.trim().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), keyword),
                        cb.like(cb.lower(root.get("email")), keyword)
                ));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            if (goal != null) {
                predicates.add(cb.equal(root.get("goalType"), goal));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Page<Users> usersPage = usersRepository.findAll(specification, pageable);
        List<AdminUserSummaryResponse> mapped = usersPage.getContent().stream().map(this::toSummary).toList();
        return new PageImpl<>(mapped, pageable, usersPage.getTotalElements());
    }

    @Override
    @Transactional
    public AdminUserStatusUpdateResponse updateUserStatus(Long userId, String action, String actorEmail, String ipAddress) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        String normalizedAction = action == null ? "" : action.trim().toUpperCase();
        if ("LOCK".equals(normalizedAction)) {
            user.setStatus(UserStatus.LOCK);
            user.setLockUntil(Instant.now().plusSeconds(365L * 24 * 60 * 60));
        } else if ("UNLOCK".equals(normalizedAction)) {
            user.setStatus(UserStatus.ACTIVE);
            user.setLockUntil(null);
            user.setFailedLoginAttempts(0);
        } else {
            throw new IllegalArgumentException("Unsupported action: " + action);
        }

        usersRepository.save(user);

        AuditLog auditLog = new AuditLog();
        auditLog.setActorEmail(actorEmail);
        auditLog.setTargetUserId(user.getId());
        auditLog.setAction(normalizedAction);
        auditLog.setDescription("Admin " + actorEmail + " changed userId=" + user.getId() + " status to " + user.getStatus());
        auditLog.setIpAddress(ipAddress == null || ipAddress.isBlank() ? "unknown" : ipAddress);
        auditLogRepository.save(auditLog);

        AdminUserStatusUpdateResponse response = new AdminUserStatusUpdateResponse();
        response.setUserId(user.getId());
        response.setStatus(user.getStatus());
        return response;
    }

    private AdminUserSummaryResponse toSummary(Users user) {
        AdminUserSummaryResponse response = new AdminUserSummaryResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setStatus(user.getStatus());
        response.setGoalType(user.getGoalType());
        return response;
    }
}
