package com.example.engineeringThesis.automobileGarageSystem.service.car;

import com.example.engineeringThesis.automobileGarageSystem.dao.car.CarDAO;
import com.example.engineeringThesis.automobileGarageSystem.dto.CarDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import com.example.engineeringThesis.automobileGarageSystem.mapper.CarMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarServiceImpl implements CarService{

    private final CarDAO carDAO;
    private final CarMapper carMapper;

    @Autowired
    public CarServiceImpl(CarDAO carDAO, CarMapper carMapper) {
        this.carDAO = carDAO;
        this.carMapper = carMapper;
    }

    @Override
    public CarDTO getCarById(Integer id) {
        Car car =  carDAO.findById(id);
        return CarMapper.INSTANCE.carToCarDTO(car);
    }

}
