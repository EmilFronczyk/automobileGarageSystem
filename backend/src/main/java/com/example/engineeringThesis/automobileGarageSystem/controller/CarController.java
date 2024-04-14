package com.example.engineeringThesis.automobileGarageSystem.controller;

import com.example.engineeringThesis.automobileGarageSystem.dto.CarDTO;
import com.example.engineeringThesis.automobileGarageSystem.service.car.CarService;
import com.example.engineeringThesis.automobileGarageSystem.service.car.CarServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public CarDTO getCarById(@PathVariable Integer id) {
        return carService.getCarById(id);
    }

    @PostMapping()
    public CarDTO addCar(@RequestBody CarDTO carDTO) {
        return carService.addNewCar(carDTO);
    }

    @GetMapping("/all")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<CarDTO> getAllCars() {
        return carService.getAllCars();
    }

    @DeleteMapping("/{id}")
    public String deleteCarById(@PathVariable Integer id) {
        return carService.deleteCarById(id);
    }

    @PutMapping()
    public CarDTO updateCar(@RequestBody CarDTO carDTO) {
        return carService.updateCar(carDTO);
    }
}
