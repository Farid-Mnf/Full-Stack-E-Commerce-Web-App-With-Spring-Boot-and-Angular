package com.farid.backend.rest;

import com.farid.backend.dto.CategoryDTO;
import com.farid.backend.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/category")
public class CategoryController {
    private CategoryService categoryService;

    @PostMapping
    public CategoryDTO addCategory(@RequestBody CategoryDTO categoryDTO){
        return categoryService.addCategory(categoryDTO);
    }
    @GetMapping("/{id}")
    public CategoryDTO getCategory(@PathVariable UUID id){
        return categoryService.getCategory(id);
    }
}
