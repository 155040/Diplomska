package com.example.skejtpark.security;

import com.example.skejtpark.model.UserEntity;
import com.example.skejtpark.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String authenticate(String username, String password) throws Exception {

        Optional<UserEntity> userDb = userRepository.findByUsername(username);

        if (userDb.isPresent() && passwordEncoder.matches(password, userDb.get().getPassword())) {
            UserEntity user = userRepository.findByUsername(username).orElseThrow(Exception::new);
            return jwtService.generateJwtToken(user);
        } else {
            return null;
        }

    }
}