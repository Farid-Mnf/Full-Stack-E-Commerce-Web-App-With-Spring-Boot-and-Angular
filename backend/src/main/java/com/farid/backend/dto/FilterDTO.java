package com.farid.backend.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class FilterDTO {
    private String Category;
    private BigDecimal priceRange;
    private Boolean inStock;
    private String searchParameter;
}
