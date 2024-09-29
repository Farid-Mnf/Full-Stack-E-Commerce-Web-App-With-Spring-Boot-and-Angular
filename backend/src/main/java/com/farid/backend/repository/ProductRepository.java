package com.farid.backend.repository;

import com.farid.backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> getProductsBySellerId(UUID id);
    List<Product> findProductByDescriptionContainsAndAvailableQuantityGreaterThan(String value, Pageable pageable, int availableQuantity);
    Page<Product> findAllByAvailableQuantityGreaterThanOrderByAvailableQuantityDesc(Pageable pageable, int availableQuantity);
    Page<Product> findAllByCategoryIdOrNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            UUID categoryId, String name, String description, Pageable pageable);
    Page<Product> findAllByCategoryIdAndPriceIsLessThanEqualOrNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            UUID categoryId, BigDecimal price, String name, String description, Pageable pageable);
    Page<Product> findAllByCategoryIdAndAvailableQuantityGreaterThanOrNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            UUID categoryId, int availableQuantity, String name, String description, Pageable pageable);
    Page<Product> findAllByCategoryIdAndPriceIsLessThanEqualAndAvailableQuantityGreaterThanOrNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(UUID categoryId, BigDecimal price, int availableQuantity, String name, String description,Pageable pageable);
}
