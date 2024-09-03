package com.farid.backend.dto;

import com.farid.backend.entity.OrderStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;
@Data
@Builder
public class OrderDTO {
    private UUID id;
    private double amount;
    private LocalDateTime date;
    private LocalDateTime shippingDate;
    private OrderStatus status;
    private UUID cartId;
    private UUID paymentId;
}
