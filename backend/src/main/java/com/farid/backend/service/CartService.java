package com.farid.backend.service;

import com.farid.backend.dto.CartDTO;
import com.farid.backend.dto.ProductDTO;
import com.farid.backend.entity.Cart;
import com.farid.backend.entity.User;
import com.farid.backend.repository.CartRepository;
import com.farid.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CartService {
    private CartRepository cartRepository;
    private UserRepository userRepository;

    public CartDTO getCart(UUID id){
        Optional<Cart> optionalCart = cartRepository.findById(id);
        if(optionalCart.isPresent()){
            return cartToCartDTO(optionalCart.get());
        }
        return null;
    }
    public CartDTO createCart(CartDTO cartDTO){

        Optional<User> optionalUser = userRepository.findById(cartDTO.getUserId());
        if(optionalUser.isPresent()){
            if(optionalUser.get().getCart() == null){ // no cart, CREATE it
                Cart newCart = cartRepository.save(
                        Cart.builder()
                                .user(optionalUser.get())
                                .build()
                );
                return cartToCartDTO(newCart);
            }else{ // cart found, RETURN it
                return cartToCartDTO(optionalUser.get().getCart());
            }
        }else{
            return null;
        }
    }
    public CartDTO cartToCartDTO(Cart cart){
        Set<ProductDTO> cartProductDTOs = new HashSet<>();
        cart.getProducts().forEach(product -> {
            cartProductDTOs.add(
                    ProductDTO.builder()
                            .name(product.getName())
                            .price(product.getPrice())
                            .description(product.getDescription())
                            .imageUrl(product.getImageUrl())
                            .build()
            );
        });
        return CartDTO.builder()
                .id(cart.getId())
                .userId(cart.getUser().getId())
                .productsDTOs(cartProductDTOs)
                .build();
    }
}
