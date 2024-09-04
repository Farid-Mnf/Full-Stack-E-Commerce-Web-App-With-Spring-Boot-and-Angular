package com.farid.backend.rest;

import com.farid.backend.dto.CartItemDTO;
import com.farid.backend.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
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
    @GetMapping("/{id}")
    public Set<CartItemDTO> getCartItems(@PathVariable UUID id){
        return cartService.getCart(id).getCartItemDTOS();
    }
}
