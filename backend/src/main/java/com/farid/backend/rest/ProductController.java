package com.farid.backend.rest;

import com.farid.backend.dto.CategoryDTO;
import com.farid.backend.dto.ProductDTO;
import com.farid.backend.dto.UserDTO;
import com.farid.backend.entity.Product;
import com.farid.backend.service.FileSaverService;
import com.farid.backend.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/product")
public class ProductController {
    private ProductService productService;
    private FileSaverService fileSaverService;
    @GetMapping
    public List<ProductDTO> getAllProducts(){
        return productService.getAllProducts();
    }
    @GetMapping("/{id}")
    public ProductDTO getProduct(@PathVariable UUID id){
        return productService.getProductById(id);
    }
    @PostMapping
    public ResponseEntity<String> addProduct(@RequestParam("name") String name,
                                     @RequestParam("description") String description,
                                     @RequestParam("price") String price,
                                     @RequestParam("quantity") String quantity,
                                     @RequestParam("category") String category,
                                     @RequestParam("userId") String userId,
                                     @RequestParam("file") MultipartFile file){


        try {
            String returnedFileName = fileSaverService.saveFileToSystem(file);
            ProductDTO productDTO = ProductDTO.builder()
                    .name(name)
                    .description(description)
                    .availableQuantity(Integer.parseInt(quantity))
                    .imageUrl(returnedFileName)
                    .price(BigDecimal.valueOf(Double.parseDouble(price)))
                    .userDTO(UserDTO.builder().id(UUID.fromString(userId)).build())
                    .categoryDTO(CategoryDTO.builder().id(UUID.fromString(category)).build())
                    .build();

            productService.addProduct(productDTO);
            return ResponseEntity.ok("product saved successfully!");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("error while saving the product image!");
        }
    }
}
