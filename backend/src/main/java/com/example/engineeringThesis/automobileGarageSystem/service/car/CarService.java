package com.example.engineeringThesis.automobileGarageSystem.service.car;

import com.example.engineeringThesis.automobileGarageSystem.dto.CarDTO;

import java.util.List;

public interface CarService {
    CarDTO getCarById(Integer id);
    CarDTO addNewCar(CarDTO carDTO);
    List<CarDTO> getAllCars();
    String deleteCarById(Integer id);
    CarDTO updateCar(CarDTO carDTO);

}
