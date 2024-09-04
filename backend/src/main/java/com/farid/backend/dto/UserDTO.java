package com.farid.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;
@Data
@Builder
public class UserDTO {
    private UUID id;
    private String username;
    private String email;
    private String password;
    private String phone;
    private AddressDTO addressDTO;
    private CartDTO cartDTO;
}
