package com.farid.backend.rest;

import com.farid.backend.dto.CartItemDTO;
import com.farid.backend.dto.CartProduct;
import com.farid.backend.dto.UserDTO;
import com.farid.backend.service.CartService;
import com.farid.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@RequestMapping("/cart")
@RestController
public class CartController {
    private CartService cartService;
    private UserService userService;

    @PostMapping
    public CartItemDTO addProductToCart(@RequestBody CartProduct cartProduct){
        UserDTO userDTO = userService.getUser(cartProduct.getUserId());

        UUID productId = cartProduct.getProductId();
        UUID cartId = userDTO.getCartDTO().getId();
        int quantity = cartProduct.getQuantity();

        return cartService.addProductToCart(
                productId,
                cartId,
                quantity
        );
    }
    @GetMapping("/{id}")
    public List<CartItemDTO> getCartItems(@PathVariable UUID id){
        System.out.println("GEt method ");
        return cartService.getCartItemsDTOS(id);
    }
}
