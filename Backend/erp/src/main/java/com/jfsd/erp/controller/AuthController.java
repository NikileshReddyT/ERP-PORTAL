package com.jfsd.erp.controller;

import com.jfsd.erp.dto.AuthRequest;
import com.jfsd.erp.dto.AuthResponse;
import com.jfsd.erp.dto.RegisterRequest;
import com.jfsd.erp.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@Valid @RequestBody AuthRequest request) {
        try {
            log.debug("Login request received for user: {}", request.getUsername());
            AuthResponse response = authService.authenticate(request);
            log.debug("Login successful for user: {}", request.getUsername());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Login failed for user: {}", request.getUsername(), e);
            throw e;
        }
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            log.debug("Registration request received for user: {}", request.getUsername());
            AuthResponse response = authService.register(request);
            log.debug("Registration successful for user: {}", request.getUsername());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Registration failed for user: {}", request.getUsername(), e);
            throw e;
        }
    }
}
