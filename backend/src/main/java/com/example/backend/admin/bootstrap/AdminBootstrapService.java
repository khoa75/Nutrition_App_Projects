package com.example.backend.admin.bootstrap;

import com.example.backend.admin.config.AdminBootstrapProperties;
import com.example.backend.entity.Users;
import com.example.backend.enums.UserStatus;
import com.example.backend.repository.UsersRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminBootstrapService {

    private static final Logger logger = LoggerFactory.getLogger(AdminBootstrapService.class);

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdminBootstrapProperties properties;

    public AdminBootstrapService(UsersRepository usersRepository,
                                 PasswordEncoder passwordEncoder,
                                 AdminBootstrapProperties properties) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.properties = properties;
    }

    @PostConstruct
    @Transactional
    public void bootstrapAdmin() {
        if (!properties.isEnabled()) {
            return;
        }

        if (isBlank(properties.getEmail()) || isBlank(properties.getPassword())) {
            logger.warn("Admin bootstrap skipped because email/password is missing");
            return;
        }

        if (usersRepository.existsByEmail(properties.getEmail().trim().toLowerCase())) {
            return;
        }

        Users admin = Users.builder()
                .name(isBlank(properties.getName()) ? "System Admin" : properties.getName().trim())
                .email(properties.getEmail().trim().toLowerCase())
                .hashPassword(passwordEncoder.encode(properties.getPassword()))
                .status(UserStatus.ACTIVE)
                .failedLoginAttempts(0)
                .build();

        usersRepository.save(admin);
        logger.info("Bootstrapped fixed admin account with email={}", admin.getEmail());
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
