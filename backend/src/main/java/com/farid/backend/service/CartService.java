package com.farid.backend.service;

import com.farid.backend.dto.CartDTO;
import com.farid.backend.dto.CartItemDTO;
import com.farid.backend.entity.Cart;
import com.farid.backend.entity.CartItem;
import com.farid.backend.entity.Product;
import com.farid.backend.repository.CartItemRepository;
import com.farid.backend.repository.CartRepository;
import com.farid.backend.repository.ProductRepository;
import com.farid.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CartService {
    private CartRepository cartRepository;
    private ProductRepository productRepository;
    private CartItemRepository cartItemRepository;

    public CartDTO getCart(UUID id){
        Optional<Cart> optionalCart = cartRepository.findById(id);
        if(optionalCart.isPresent()){
            return cartToCartDTO(optionalCart.get());
        }
        return null;
    }
    public CartItemDTO addProductToCart(UUID productId, UUID cartId, int quantity){
        Cart cart = cartRepository.findById(cartId).get();
        Product product = productRepository.findById(productId).get();

        // check if quantity exceeds the available quantity
        if(product.getAvailableQuantity() < quantity) return null;

        CartItem cartItem = cartItemRepository.save(
                CartItem.builder()
                        .cart(cart)
                        .product(product)
                        .quantity(quantity)
                        .price(product.getPrice())
                        .build()
        );

        return CartItemDTO.builder()
                .productId(cartItem.getProduct().getId())
                .cartId(cartItem.getCart().getId())
                .quantity(cartItem.getQuantity())
                .id(cartItem.getId())
                .price(cartItem.getPrice())
                .build();
    }
    public CartDTO cartToCartDTO(Cart cart){
        return CartDTO.builder()
                .id(cart.getId())
                .build();
    }
}
