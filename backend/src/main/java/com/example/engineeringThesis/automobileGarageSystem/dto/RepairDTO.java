package com.example.engineeringThesis.automobileGarageSystem.dto;

import com.example.engineeringThesis.automobileGarageSystem.entity.Parts;
import com.example.engineeringThesis.automobileGarageSystem.entity.PartsInRepair;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RepairDTO {
    private int id;
    private String client;
    private String vehicle;
    private String worker;
    private String registration;
    private boolean status;
    private String date;
    private String title;
    private List<Parts> parts;
    private double income;
    private int spending;
    private double costOfRepair;
}
