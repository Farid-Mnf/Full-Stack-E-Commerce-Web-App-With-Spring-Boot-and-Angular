package com.farid.backend.rest;

import com.farid.backend.dto.UserDTO;
import com.farid.backend.entity.User;
import com.farid.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    UserService userService;

    @PostMapping
    public User addUser(@RequestBody UserDTO userDTO){
        return userService.addUser(userDTO);
    }
    @GetMapping("/{id}")
    public User getUser(@PathVariable UUID id){
        return userService.getUser(id);
    }
}
