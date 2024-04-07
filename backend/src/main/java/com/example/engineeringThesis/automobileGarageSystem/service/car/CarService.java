package com.example.engineeringThesis.automobileGarageSystem.service.car;

import com.example.engineeringThesis.automobileGarageSystem.dto.CarDTO;

public interface CarService {
    CarDTO getCarById(Integer id);
    CarDTO addNewCar(CarDTO carDTO);
}
