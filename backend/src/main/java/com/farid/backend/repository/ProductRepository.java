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
    List<Product> findProductByDescriptionContains(String value, Pageable pageable);
    Page<Product> findAllByOrderByAvailableQuantityDesc(Pageable pageable);
    Page<Product> findAllByCategoryId(UUID categoryId, Pageable pageable);
    Page<Product> findAllByCategoryIdAndPriceIsLessThanEqual(UUID categoryId, BigDecimal price, Pageable pageable);
    Page<Product> findAllByCategoryIdAndAvailableQuantityGreaterThan(UUID categoryId, int availableQuantity, Pageable pageable);
    Page<Product> findAllByCategoryIdAndPriceIsLessThanEqualAndAvailableQuantityGreaterThan(UUID categoryId, BigDecimal price, int availableQuantity, Pageable pageable);
}
