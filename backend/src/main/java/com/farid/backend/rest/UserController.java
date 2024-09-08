package com.farid.backend.rest;

import com.farid.backend.config.JwtService;
import com.farid.backend.dto.AuthRequestDTO;
import com.farid.backend.dto.JwtTokenResponse;
import com.farid.backend.dto.UserDTO;
import com.farid.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    private UserService userService;
    private AuthenticationManager authenticationManager;
    private JwtService jwtService;

    @PostMapping("/register")
    public UserDTO addUser(@RequestBody UserDTO userDTO){
        return userService.addUser(userDTO);
    }
    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable UUID id){
        return userService.getUser(id);
    }
    @PostMapping("/login")
    public ResponseEntity<JwtTokenResponse> login(@RequestBody AuthRequestDTO authRequestDTO) {
        try{
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authRequestDTO.getEmail(),
                    authRequestDTO.getPassword()
            ));
            String jwt = jwtService.generateJwtToken(authentication);
            return ResponseEntity.ok(new JwtTokenResponse("Bearer " + jwt));
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }
}