package com.example.engineeringThesis.automobileGarageSystem.controller;

import com.example.engineeringThesis.automobileGarageSystem.dto.CarDTO;
import com.example.engineeringThesis.automobileGarageSystem.service.car.CarService;
import com.example.engineeringThesis.automobileGarageSystem.service.car.CarServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping("/{id}")
    public CarDTO getCarById(@PathVariable Integer id) {
        return carService.getCarById(id);
    }

    @PostMapping()
    public CarDTO addCar(@RequestBody CarDTO carDTO) {
        return carService.addNewCar(carDTO);
    }

}