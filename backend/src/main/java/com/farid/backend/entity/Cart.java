package com.farid.backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @OneToOne
    private User user;
    @OneToMany(mappedBy = "cart")
    private List<CartItem> cartItems = new ArrayList<>();
}