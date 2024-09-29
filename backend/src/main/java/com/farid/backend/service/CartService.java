package com.farid.backend.service;

import com.farid.backend.dto.CartDTO;
import com.farid.backend.dto.CartItemDTO;
import com.farid.backend.entity.Cart;
import com.farid.backend.entity.CartItem;
import com.farid.backend.entity.Product;
import com.farid.backend.repository.CartItemRepository;
import com.farid.backend.repository.CartRepository;
import com.farid.backend.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CartService {
    private CartRepository cartRepository;
    private ProductRepository productRepository;
    private CartItemRepository cartItemRepository;

    public List<CartItemDTO> getCartItemsDTOS(UUID id){
        System.out.println("getCartItemsDTOS");
        Optional<Cart> optionalCart = cartRepository.findById(id);
        if(optionalCart.isPresent()){
            List<CartItem> cartItems = optionalCart.get().getCartItems();
            System.out.println("cart items size: " + cartItems.size());
            if(!cartItems.isEmpty())
                return cartItems.stream().map(this::cartItemToCartItemDTO).toList();
        }
        return null;
    }
    public CartItemDTO cartItemToCartItemDTO(CartItem cartItem){
        return CartItemDTO.builder()
                .price(cartItem.getPrice())
                .quantity(cartItem.getQuantity())
                .cartId(cartItem.getCart().getId())
                .id(cartItem.getId())
                .imageUrl(cartItem.getProduct().getImageUrl())
                .productName(cartItem.getProduct().getName())
                .build();
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

    public void deleteCartItem(UUID id) {
        cartItemRepository.deleteById(id);
    }
}
