package com.farid.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "Users")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String username;
    private String email;
    private String password;
    private String phone;
    @OneToOne(cascade = CascadeType.ALL)
    private Cart cart;
    @OneToOne(cascade = CascadeType.ALL)
    private Address address;
}
