package com.farid.backend.dto;

import com.farid.backend.entity.Cart;
import com.farid.backend.entity.Product;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class CartItemDTO {
    private UUID id;
    private UUID cartId;
    private UUID productId;
    private int quantity;
    private BigDecimal price;
}
