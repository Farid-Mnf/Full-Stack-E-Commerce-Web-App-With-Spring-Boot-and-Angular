package com.farid.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
@Builder
public class CartDTO {
    private UUID id;
    private UUID userId;
    private Set<ProductDTO> productsDTOs;
}
