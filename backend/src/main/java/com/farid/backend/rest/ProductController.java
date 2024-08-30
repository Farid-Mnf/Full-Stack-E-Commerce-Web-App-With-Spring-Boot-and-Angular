package com.farid.backend.rest;

import com.farid.backend.entity.Product;
import com.farid.backend.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class ProductController {
    private ProductService productService;
    @GetMapping
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable UUID id){
        return productService.getProductById(id);
    }

}
