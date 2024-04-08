package com.example.engineeringThesis.automobileGarageSystem.dto;

import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ClientDTO {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private List<Car> cars;
}
