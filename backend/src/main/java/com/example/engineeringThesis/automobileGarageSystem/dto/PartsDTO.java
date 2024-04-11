package com.example.engineeringThesis.automobileGarageSystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PartsDTO {
    private int id;
    private String catalogNumber;
    private String partName;
    private int amount;
    private int price;
}
