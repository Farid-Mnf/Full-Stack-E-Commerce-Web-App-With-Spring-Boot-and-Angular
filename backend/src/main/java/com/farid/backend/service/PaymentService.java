package com.farid.backend.service;

import com.farid.backend.dto.PaymentDTO;
import com.farid.backend.entity.Payment;
import com.farid.backend.repository.OrderRepository;
import com.farid.backend.repository.PaymentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class PaymentService {
    private PaymentRepository paymentRepository;
    private OrderRepository orderRepository;

    public PaymentDTO addPayment(PaymentDTO paymentDTO){
        Payment payment = paymentRepository.save(
                Payment.builder()
                        .amount(paymentDTO.getAmount())
                        .method(paymentDTO.getMethod())
                        .order(orderRepository.findById(paymentDTO.getOrderId()).get())
                        .build()
        );
        return paymentToPaymentDTO(payment);
    }

    public PaymentDTO getPayment(UUID id){
        Optional<Payment> paymentOptional = paymentRepository.findById(id);
        return paymentOptional.isPresent()? paymentToPaymentDTO(paymentOptional.get()) : null;
    }

    public PaymentDTO paymentToPaymentDTO(Payment payment){
        return PaymentDTO.builder()
                .id(payment.getId())
                .orderId(payment.getOrder().getId())
                .amount(payment.getAmount())
                .method(payment.getMethod())
                .build();
    }
}
