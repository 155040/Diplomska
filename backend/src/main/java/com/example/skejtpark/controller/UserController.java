package com.example.skejtpark.controller;

import com.example.skejtpark.dto.UserDto;
import com.example.skejtpark.security.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final AuthenticationService authenticationService;

    public UserController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto) throws Exception {
        String jwt = authenticationService.authenticate(userDto.username, userDto.password);

        if(jwt != null) {
            return ResponseEntity.ok(jwt);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
