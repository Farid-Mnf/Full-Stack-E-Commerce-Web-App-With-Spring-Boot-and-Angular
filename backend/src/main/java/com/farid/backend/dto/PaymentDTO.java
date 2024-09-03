package com.farid.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
@Data
public class PaymentDTO {
    private UUID id;
    private String method;
    private double amount;
    private UUID orderId;
}
