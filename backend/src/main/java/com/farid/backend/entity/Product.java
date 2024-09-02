package com.farid.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String description;
    private double price;
    private String imageUrl;
    @ManyToMany(mappedBy = "products")
    private Set<Cart> carts;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
