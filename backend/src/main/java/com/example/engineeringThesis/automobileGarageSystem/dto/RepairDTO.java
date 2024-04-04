package com.example.engineeringThesis.automobileGarageSystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RepairDTO {
    private String client;
    private String mark;
    private String model;
    private String registration;
    private String status;
    private String date;
    private String title;
}
