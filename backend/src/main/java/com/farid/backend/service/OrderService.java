package com.farid.backend.service;

import com.farid.backend.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OrderService {
    private OrderRepository orderRepository;

    public OrderDTO addOrder(OrderDTO orderDTO){

    }

}
