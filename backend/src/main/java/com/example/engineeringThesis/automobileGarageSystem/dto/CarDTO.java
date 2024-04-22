package com.example.engineeringThesis.automobileGarageSystem.dto;

import com.example.engineeringThesis.automobileGarageSystem.entity.Repair;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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
    private List<Repair> repairs;
}
