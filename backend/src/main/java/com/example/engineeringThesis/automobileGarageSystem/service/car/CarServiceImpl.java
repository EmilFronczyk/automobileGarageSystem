package com.example.engineeringThesis.automobileGarageSystem.service.car;

import com.example.engineeringThesis.automobileGarageSystem.dao.car.CarDAO;
import com.example.engineeringThesis.automobileGarageSystem.dao.client.ClientDAO;
import com.example.engineeringThesis.automobileGarageSystem.dto.CarDTO;
import com.example.engineeringThesis.automobileGarageSystem.dto.ClientDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import com.example.engineeringThesis.automobileGarageSystem.entity.Client;
import com.example.engineeringThesis.automobileGarageSystem.mapper.CarMapper;
import com.example.engineeringThesis.automobileGarageSystem.mapper.ClientMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public List<CarDTO> getAllCars() {
        List<Car> cars = carDAO.findAll();
        return cars.stream()
                .map(carMapper::carToCarDTO)
                .collect(Collectors.toList());
    }

    @Override
    public String deleteCarById(Integer id) {
        CarDTO carDTO = CarMapper.INSTANCE.carToCarDTO(carDAO.findById(id));
        carDAO.deleteById(id);
        return "Car: " + carDTO.getMark() + " " + carDTO.getModel() + " was deleted";
    }

    @Override
    public CarDTO updateCar(CarDTO carDTO) {
        Car car = carDAO.findByRegistrationNumber(carDTO.getRegistration());
        car.setStatus(carDTO.isStatus());
        carDAO.update(car);
        return carDTO;
    }


}
