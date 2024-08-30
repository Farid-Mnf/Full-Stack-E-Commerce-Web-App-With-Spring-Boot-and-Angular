package com.farid.backend.service;

import com.farid.backend.entity.User;
import com.farid.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

}
