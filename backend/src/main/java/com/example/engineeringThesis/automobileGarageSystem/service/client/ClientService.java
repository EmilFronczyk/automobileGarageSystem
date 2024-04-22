package com.example.engineeringThesis.automobileGarageSystem.service.client;

import com.example.engineeringThesis.automobileGarageSystem.dto.ClientDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import org.springframework.data.relational.core.sql.In;

import java.util.List;

public interface ClientService {
    ClientDTO getClientById(Integer id);

    ClientDTO addNewClient(ClientDTO clientDTO);

    List<ClientDTO> getAllClients();

    List<Car> filerClientCars(Integer id);

    String deleteClientById(Integer id);

    ClientDTO updateClient(ClientDTO clientDTO);

}
