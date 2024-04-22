package com.example.engineeringThesis.automobileGarageSystem.dao.car;

import com.example.engineeringThesis.automobileGarageSystem.dto.CarDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import com.example.engineeringThesis.automobileGarageSystem.entity.Client;
import com.example.engineeringThesis.automobileGarageSystem.entity.Repair;

import java.util.List;

public interface CarDAO {
    void save(Car theCar);
    Car findById(Integer id);
    List<Car> findAll();
    void update(Car theCar);
    void deleteById(Integer id);
    Client findClientByCarId(Integer id);
    Car findByRegistrationNumber(String registration);
    List<Repair> findRepairByCarId(Integer id);
}
