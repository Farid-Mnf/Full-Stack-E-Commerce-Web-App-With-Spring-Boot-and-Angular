package com.farid.backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private double amount;
    private LocalDateTime date;
    private LocalDateTime shippingDate;
    private OrderStatus status;
    @OneToOne
    private Cart cart;
    @OneToOne(mappedBy = "order")
    private Payment payment;
}
enum OrderStatus {
    OrderCancelled,
    OrderDelivered,
    OrderInTransit,
    OrderPaymentDue,
    OrderPickupAvailable,
    OrderProblem,
    OrderProcessing,
    OrderReturned
}
