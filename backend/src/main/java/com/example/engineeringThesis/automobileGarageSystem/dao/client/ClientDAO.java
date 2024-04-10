package com.example.engineeringThesis.automobileGarageSystem.dao.client;
import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import com.example.engineeringThesis.automobileGarageSystem.entity.Client;

import java.util.List;

public interface ClientDAO {
    void save(Client theClient);
    Client findById(Integer id);
    List<Client> findAll();
    void update(Client theClient);
    void deleteById(Integer id);
    Client findClientByName(String name);
    //List<Object[]> findCarByClientId(Integer id);
    List<Car> findCarByClientId(Integer id);
}
