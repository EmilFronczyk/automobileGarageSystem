package com.example.engineeringThesis.automobileGarageSystem.dao.car;

import com.example.engineeringThesis.automobileGarageSystem.entity.Car;

import java.util.List;

public interface CarDAO {
    void save(Car theCar);
    Car findById(Integer id);
    List<Car> findAll();
    void update(Car theCar);
    void deleteById(Integer id);
}
