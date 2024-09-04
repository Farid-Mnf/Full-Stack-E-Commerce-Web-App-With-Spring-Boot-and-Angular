package com.farid.backend.rest;

import com.farid.backend.dto.CartItemDTO;
import com.farid.backend.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@AllArgsConstructor
@RequestMapping("/cart")
@RestController
public class CartController {
    private CartService cartService;

    @PostMapping
    public CartItemDTO addProductToCart(@RequestBody CartItemDTO cartItemDTO){
        return cartService.addProductToCart(cartItemDTO.getProductId(), cartItemDTO.getCartId(), cartItemDTO.getQuantity());
    }
}
