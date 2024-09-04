package com.farid.backend.rest;

import com.farid.backend.dto.ProductDTO;
import com.farid.backend.entity.Product;
import com.farid.backend.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/product")
public class ProductController {
    private ProductService productService;
    @GetMapping
    public List<ProductDTO> getAllProducts(){
        return productService.getAllProducts();
    }
    @GetMapping("/{id}")
    public ProductDTO getProduct(@PathVariable UUID id){
        return productService.getProductById(id);
    }
    @PostMapping
    public ProductDTO addProduct(@RequestBody ProductDTO productDTO){
        return productService.addProduct(productDTO);
    }

}
