package com.farid.backend.service;

import com.farid.backend.dto.UserDTO;
import com.farid.backend.entity.User;
import com.farid.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;

    public List<UserDTO> getUsers(){
        List<UserDTO> users = new LinkedList<>();
        userRepository.findAll().forEach(user -> {
            users.add(userToUserDTO(user));
        });
        return users;
    }
    public UserDTO addUser(UserDTO userDTO){
        User user = userRepository.save(
                User.builder()
                        .phone(userDTO.getPhone())
                        .email(userDTO.getEmail())
                        .username(userDTO.getUsername())
                        .password(userDTO.getPassword())
                        .build()
        );
        return userToUserDTO(user);
    }
    public UserDTO getUser(UUID id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.isPresent()? userToUserDTO(userOptional.get()) : null;
    }
    private UserDTO userToUserDTO(User user) {
        return UserDTO.builder()
                .phone(user.getPhone())
                .email(user.getEmail())
                .username(user.getUsername())
                .password(user.getPassword())
                .id(user.getId())
                .build();
    }
}
