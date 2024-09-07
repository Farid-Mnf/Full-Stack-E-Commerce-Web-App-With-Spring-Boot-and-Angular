package com.farid.backend.service;

import com.farid.backend.dto.OrderDTO;
import com.farid.backend.entity.Order;
import com.farid.backend.repository.OrderRepository;
import com.farid.backend.repository.PaymentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class OrderService {
    private OrderRepository orderRepository;
    private PaymentRepository paymentRepository;

    public OrderDTO addOrder(OrderDTO orderDTO){
        Order order = orderRepository.save(
                Order.builder()
                        .date(orderDTO.getDate())
                        .shippingDate(orderDTO.getShippingDate())
                        .amount(orderDTO.getAmount())
                        .status(orderDTO.getStatus())
                        .payment(paymentRepository.findById(orderDTO.getPaymentId()).get())
                        .build()
        );
        return orderToOrderDTO(order);
    }
    public OrderDTO getOrder(UUID id){
        Optional<Order> orderOptional = orderRepository.findById(id);
        return orderOptional.isPresent()? orderToOrderDTO(orderOptional.get()) : null;
    }
    public OrderDTO orderToOrderDTO(Order order){
        return OrderDTO.builder()
                .id(order.getId())
                .paymentId(order.getPayment().getId())
                .amount(order.getAmount())
                .status(order.getStatus())
                .date(order.getDate())
                .shippingDate(order.getShippingDate())
                .build();
    }

}
