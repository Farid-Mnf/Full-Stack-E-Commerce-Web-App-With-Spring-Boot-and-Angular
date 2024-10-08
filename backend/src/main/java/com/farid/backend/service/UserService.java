package com.farid.backend.service;

import com.farid.backend.dto.AddressDTO;
import com.farid.backend.dto.CartDTO;
import com.farid.backend.dto.CartItemDTO;
import com.farid.backend.dto.UserDTO;
import com.farid.backend.entity.Address;
import com.farid.backend.entity.Cart;
import com.farid.backend.entity.CartItem;
import com.farid.backend.entity.User;
import com.farid.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    public List<UserDTO> getUsers(){
        List<UserDTO> users = new LinkedList<>();
        userRepository.findAll().forEach(user -> {
            users.add(userToUserDTO(user));
        });
        return users;
    }
    public UserDTO addUser(UserDTO userDTO){
        Address address = Address.builder()
                .city(userDTO.getAddressDTO().getCity())
                .country(userDTO.getAddressDTO().getCountry())
                .streetName(userDTO.getAddressDTO().getStreetName())
                .build();
        // create an empty default cart when creating the user
        Cart cart = Cart.builder().build();


        User user = userRepository.save(
                User.builder()
                        .phone(userDTO.getPhone())
                        .email(userDTO.getEmail())
                        .name(userDTO.getName())
                        .password(passwordEncoder.encode(userDTO.getPassword()))
                        .address(address)
                        .cart(cart)
                        .build()
        );

        return userToUserDTO(user);
    }
    public UserDTO getUser(UUID id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.isPresent()? userToUserDTO(userOptional.get()) : null;
    }

    public void updateUserImage(String imageName, UUID id){
        userRepository.updateUserImage(imageName, id);
    }

    private UserDTO userToUserDTO(User user) {
        return UserDTO.builder()
                .phone(user.getPhone())
                .email(user.getEmail())
                .name(user.getName())
                .password(user.getPassword())
                .userImage(user.getUserImage())
                .id(user.getId())
                .addressDTO(
                        AddressDTO.builder()
                                .id(user.getAddress().getId())
                                .city(user.getAddress().getCity())
                                .country(user.getAddress().getCountry())
                                .streetName(user.getAddress().getStreetName())
                                .build()
                )
                .cartDTO(
                        CartDTO.builder()
                                .id(user.getCart().getId())
                                .cartItemDTOS(getCartItemsDTOS(user.getCart().getCartItems()))
                                .build()
                )
                .build();
    }
    private Set<CartItemDTO> getCartItemsDTOS(List<CartItem> cartItems){
        Set<CartItemDTO> cartItemDTOS = new HashSet<>();
        if(cartItems == null) return cartItemDTOS;
        cartItems.forEach(cartItem -> {
            cartItemDTOS.add(cartItemToCartItemDTO(cartItem));
        });
        return cartItemDTOS;
    }
    private CartItemDTO cartItemToCartItemDTO(CartItem cartItem){
        return CartItemDTO.builder()
                .cartId(cartItem.getCart().getId())
                .price(cartItem.getPrice())
                .quantity(cartItem.getQuantity())
                .productName(cartItem.getProduct().getName())
                .imageUrl(cartItem.getProduct().getImageUrl())
                .id(cartItem.getId())
                .build();
    }

}
