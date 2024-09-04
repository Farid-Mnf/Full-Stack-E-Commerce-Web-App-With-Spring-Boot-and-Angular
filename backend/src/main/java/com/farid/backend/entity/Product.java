package com.farid.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
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
    private BigDecimal price;
    private String imageUrl;
    private int availableQuantity;
    @OneToMany(mappedBy = "product")
    private List<CartItem> cartItems = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
