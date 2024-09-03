package com.farid.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ProductDTO {
    private UUID id;
    private String name;
    private String description;
    private Double price;
    private String imageUrl;
}
