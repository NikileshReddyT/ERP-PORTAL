package com.jfsd.erp.config;

import com.jfsd.erp.model.Role;
import com.jfsd.erp.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        // Initialize roles if they don't exist
        for (Role.ERole roleEnum : Role.ERole.values()) {
            if (!roleRepository.existsByName(roleEnum)) {
                Role role = Role.builder()
                        .name(roleEnum)
                        .build();
                roleRepository.save(role);
            }
        }
    }
}
