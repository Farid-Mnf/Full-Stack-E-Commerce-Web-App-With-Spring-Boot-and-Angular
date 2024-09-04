package com.farid.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;
@Data
@Builder
public class AddressDTO {
    private UUID id;
    private String city;
    private String country;
    private String streetName;
}
