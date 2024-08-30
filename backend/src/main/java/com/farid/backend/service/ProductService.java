package com.farid.backend.service;

import com.farid.backend.dto.ProductDTO;
import com.farid.backend.entity.Product;
import com.farid.backend.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProductService {
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(UUID id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product addProduct(ProductDTO productDTO) {
        return productRepository.save(
                Product.builder()
                        .description(productDTO.getDescription())
                        .price(productDTO.getPrice())
                        .name(productDTO.getName())
                        .imageUrl(productDTO.getImageUrl())
                        .build()
        );

    }
}
