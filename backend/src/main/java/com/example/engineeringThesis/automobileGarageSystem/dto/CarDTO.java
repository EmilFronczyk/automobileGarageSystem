package com.example.engineeringThesis.automobileGarageSystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarDTO {
    private int id;
    private String mark;
    private String model;
    private boolean status;
    private String registration;
    private String nr_vin;
    private String client;
}
