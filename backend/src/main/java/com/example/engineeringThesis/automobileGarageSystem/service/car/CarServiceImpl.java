package com.example.engineeringThesis.automobileGarageSystem.service.car;

import com.example.engineeringThesis.automobileGarageSystem.dao.car.CarDAO;
import com.example.engineeringThesis.automobileGarageSystem.dao.client.ClientDAO;
import com.example.engineeringThesis.automobileGarageSystem.dto.CarDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import com.example.engineeringThesis.automobileGarageSystem.entity.Client;
import com.example.engineeringThesis.automobileGarageSystem.mapper.CarMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarServiceImpl implements CarService{

    private final CarDAO carDAO;
    private final ClientDAO clientDAO;
    private final CarMapper carMapper;

    @Autowired
    public CarServiceImpl(CarDAO carDAO, ClientDAO clientDAO, CarMapper carMapper) {
        this.carDAO = carDAO;
        this.clientDAO = clientDAO;
        this.carMapper = carMapper;
    }

    @Override
    public CarDTO getCarById(Integer id) {
        Car car =  carDAO.findById(id);
        return CarMapper.INSTANCE.carToCarDTO(car);
    }

    @Override
    public CarDTO addNewCar(CarDTO carDTO) {
        Car car = carMapper.carDTOToCar(carDTO);
        Client client = clientDAO.findClientByName(carDTO.getClient());
        client.add(car);
        carDAO.save(car);
        return carDTO;
    }


}
