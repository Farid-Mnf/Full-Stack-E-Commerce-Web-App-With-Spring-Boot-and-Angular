package com.farid.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class CartItemDTO {
    private UUID id;
    private UUID cartId;
    private String imageUrl;
    private int quantity;
    private String productName;
    private BigDecimal price;
}
