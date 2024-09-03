package com.farid.backend.service;

import com.farid.backend.dto.CategoryDTO;
import com.farid.backend.entity.Category;
import com.farid.backend.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {
    private CategoryRepository categoryRepository;

    public CategoryDTO addCategory(CategoryDTO categoryDTO){
        Category category = categoryRepository.save(
                Category.builder()
                        .name(categoryDTO.getName())
                        .build()
        );
        return categoryToCategoryDTO(category);
    }
    public List<CategoryDTO> getAllCategories(){
        List<CategoryDTO> categoryDTOS = new LinkedList<>();
        categoryRepository.findAll().forEach(category -> {
            categoryDTOS.add(categoryToCategoryDTO(category));
        });
        return categoryDTOS;
    }
    public CategoryDTO categoryToCategoryDTO(Category category){
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }
}
