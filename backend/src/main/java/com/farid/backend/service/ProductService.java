package com.farid.backend.service;

import com.farid.backend.dto.CategoryDTO;
import com.farid.backend.dto.FilterDTO;
import com.farid.backend.dto.ProductDTO;
import com.farid.backend.dto.UserDTO;
import com.farid.backend.entity.Category;
import com.farid.backend.entity.Product;
import com.farid.backend.entity.User;
import com.farid.backend.repository.CategoryRepository;
import com.farid.backend.repository.ProductRepository;
import com.farid.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductService {
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;
    private UserRepository userRepository;

    public List<ProductDTO> getAllProducts() {
        List<ProductDTO> productDTOS = new ArrayList<>();
        productRepository.findAll().forEach(product -> {
            productDTOS.add(productToProductDTO(product));
        });
        return productDTOS;
    }

    public ProductDTO getProductById(UUID id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) return productToProductDTO(product);
        return null;
    }

    public ProductDTO addProduct(ProductDTO productDTO) {
        Optional<Category> categoryOptional = categoryRepository.findById(productDTO.getCategoryDTO().getId());
        Optional<User> userOptional = userRepository.findById(productDTO.getUserDTO().getId());
        if (categoryOptional.isPresent() && userOptional.isPresent()) {
            Product product = productRepository.save(
                    Product.builder()
                            .description(productDTO.getDescription())
                            .price(productDTO.getPrice())
                            .name(productDTO.getName())
                            .imageUrl(productDTO.getImageUrl())
                            .category(categoryOptional.get())
                            .availableQuantity(productDTO.getAvailableQuantity())
                            .seller(userOptional.get())
                            .build()
            );
            return productToProductDTO(product);
        } else {
            return null;
        }

    }

    public ProductDTO productToProductDTO(Product product) {
        return ProductDTO.builder()
                .name(product.getName())
                .id(product.getId())
                .price(product.getPrice())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .availableQuantity(product.getAvailableQuantity())
                .userDTO(
                        UserDTO.builder()
                                .name(product.getSeller().getName())
                                .email(product.getSeller().getEmail())
                                .phone(product.getSeller().getPhone())
                                .id(product.getSeller().getId())
                                .build()
                )
                .categoryDTO(
                        CategoryDTO.builder()
                                .name(product.getCategory().getName())
                                .id(product.getCategory().getId())
                                .build()
                ).build();
    }

    public List<ProductDTO> getAllUserProducts(UUID userId) {
        List<Product> products = productRepository.getProductsBySellerId(userId);
        List<ProductDTO> productDTOS = new ArrayList<>();
        products.forEach(product -> {
            productDTOS.add(productToProductDTO(product));
        });

        return productDTOS;
    }

    public List<ProductDTO> getFeaturedProducts() {
        return productRepository.findAllByAvailableQuantityGreaterThanOrderByAvailableQuantityDesc(Pageable.ofSize(4), 0)
                .stream().map(this::productToProductDTO).collect(Collectors.toList());
    }

    public List<ProductDTO> getTrendingProducts() {
        return productRepository.findProductByDescriptionContainsAndAvailableQuantityGreaterThan("Trending", Pageable.ofSize(4), 0)
                .stream().map(this::productToProductDTO).collect(Collectors.toList());
    }

    public List<ProductDTO> getFilteredProducts(FilterDTO filterDTO, int pageNumber, int pageSize) {
        UUID categoryId = UUID.randomUUID();
        if(filterDTO.getCategory() != null){
            categoryId = UUID.fromString(filterDTO.getCategory());
        }
        BigDecimal priceRange = filterDTO.getPriceRange();
        boolean inStock = filterDTO.getInStock();
        String searchParameter = filterDTO.getSearchParameter();
        Pageable pageable = Pageable.ofSize(4);

        Pageable sizedPageable = PageRequest.of(pageNumber, pageSize);

        // Determine which repository method to call based on filterDTO
        if (inStock && priceRange.compareTo(BigDecimal.valueOf(3000)) != 0) {
            return fetchProductsByCategoryPriceAndStock(categoryId, priceRange, searchParameter, sizedPageable);

        } else if (!inStock && priceRange.compareTo(BigDecimal.valueOf(3000)) != 0) {
            return fetchProductsByCategoryAndPrice(categoryId, priceRange, searchParameter, sizedPageable);

        } else if (inStock) {
            return fetchProductsByCategoryAndStock(categoryId, searchParameter, sizedPageable);

        } else {
            return fetchProductsByCategory(categoryId, searchParameter, sizedPageable);
        }
    }

    private List<ProductDTO> fetchProductsByCategoryPriceAndStock(UUID categoryId, BigDecimal priceRange, String searchParameter, Pageable pageable) {
        return productRepository.findAllByCategoryIdAndPriceIsLessThanEqualAndAvailableQuantityGreaterThanOrNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                        categoryId, priceRange, 0, searchParameter, searchParameter, pageable
                ).stream()
                .map(this::productToProductDTO)
                .toList();
    }

    private List<ProductDTO> fetchProductsByCategoryAndPrice(UUID categoryId, BigDecimal priceRange, String searchParameter, Pageable pageable) {
        return productRepository.findAllByCategoryIdAndPriceIsLessThanEqualOrNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(categoryId, priceRange, searchParameter, searchParameter, pageable)
                .stream()
                .map(this::productToProductDTO)
                .toList();
    }

    private List<ProductDTO> fetchProductsByCategoryAndStock(UUID categoryId, String searchParameter, Pageable pageable) {
        return productRepository.findAllByCategoryIdAndAvailableQuantityGreaterThanOrNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(categoryId, 0, searchParameter, searchParameter, pageable)
                .stream()
                .map(this::productToProductDTO)
                .toList();
    }

    private List<ProductDTO> fetchProductsByCategory(UUID categoryId, String searchParameter, Pageable pageable) {
        return productRepository.findAllByCategoryIdOrNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(categoryId, searchParameter, searchParameter, pageable)
                .stream()
                .map(this::productToProductDTO)
                .toList();
    }
}
