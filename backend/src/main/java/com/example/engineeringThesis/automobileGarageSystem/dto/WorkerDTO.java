package com.example.engineeringThesis.automobileGarageSystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WorkerDTO {
    private int id;
    private String firstName;
    private String lastName;
    private String position;
    private int payRate;
    private String phoneNumber;
    private String hireDate;
}
