package com.example.engineeringThesis.automobileGarageSystem.dto;

import lombok.Getter;
import lombok.Setter;

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
}
