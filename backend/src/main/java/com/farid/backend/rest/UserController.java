package com.farid.backend.rest;

import com.farid.backend.dto.UserDTO;
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
    public UserDTO addUser(@RequestBody UserDTO userDTO){
        return userService.addUser(userDTO);
    }
    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable UUID id){
        return userService.getUser(id);
    }
}