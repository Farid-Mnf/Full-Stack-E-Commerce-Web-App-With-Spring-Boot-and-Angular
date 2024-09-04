package com.farid.backend.service;

import com.farid.backend.dto.CategoryDTO;
import com.farid.backend.dto.ProductDTO;
import com.farid.backend.entity.Category;
import com.farid.backend.entity.Product;
import com.farid.backend.repository.CategoryRepository;
import com.farid.backend.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProductService {
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;

    public List<ProductDTO> getAllProducts() {
        List<ProductDTO> productDTOS = new ArrayList<>();
        productRepository.findAll().forEach(product -> {
            productDTOS.add(productToProductDTO(product));
        });
        return productDTOS;
    }

    public ProductDTO getProductById(UUID id) {
        Product product = productRepository.findById(id).orElse(null);
        if(product != null) return productToProductDTO(product);
        return null;
    }

    public ProductDTO addProduct(ProductDTO productDTO) {
        Optional<Category> categoryOptional = categoryRepository.findById(productDTO.getCategoryDTO().getId());
        if(categoryOptional.isPresent()){
            Product product = productRepository.save(
                    Product.builder()
                            .description(productDTO.getDescription())
                            .price(productDTO.getPrice())
                            .name(productDTO.getName())
                            .imageUrl(productDTO.getImageUrl())
                            .category(categoryOptional.get())
                            .availableQuantity(productDTO.getAvailableQuantity())
                            .build()
            );
            return productToProductDTO(product);
        }else{
            return null;
        }

    }
    public ProductDTO productToProductDTO(Product product){
        return ProductDTO.builder()
                .name(product.getName())
                .id(product.getId())
                .price(product.getPrice())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .availableQuantity(product.getAvailableQuantity())
                .categoryDTO(
                        CategoryDTO.builder()
                                .name(product.getCategory().getName())
                                .id(product.getCategory().getId())
                                .build()
                ).build();
    }
}
