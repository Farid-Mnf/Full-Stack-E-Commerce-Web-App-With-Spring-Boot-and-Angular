package com.farid.backend.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CartProduct {
    private UUID userId;
    private UUID productId;
    private int quantity;
}
