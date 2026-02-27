package com.example.skejtpark.data;

import com.example.skejtpark.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class DataInitializr {

    private final UserService userService;

    public DataInitializr(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void initializeData() {
        userService.register("admin", "admin");
    }
}
