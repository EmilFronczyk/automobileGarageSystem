package com.example.engineeringThesis.automobileGarageSystem.service.client;

import com.example.engineeringThesis.automobileGarageSystem.dao.client.ClientDAO;
import com.example.engineeringThesis.automobileGarageSystem.dto.ClientDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import com.example.engineeringThesis.automobileGarageSystem.entity.Client;
import com.example.engineeringThesis.automobileGarageSystem.mapper.ClientMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClientServiceImpl implements ClientService{

    private final ClientMapper clientMapper;
    private final ClientDAO clientDAO;

    @Autowired
    public ClientServiceImpl(ClientMapper clientMapper, ClientDAO clientDAO) {
        this.clientMapper = clientMapper;
        this.clientDAO = clientDAO;
    }

    @Override
    public ClientDTO getClientById(Integer id) {
        Client client = clientDAO.findById(id);
        ClientDTO clientDTO = ClientMapper.INSTANCE.clientToClientDTO(client);
        clientDTO.setCars(new ArrayList<>());
        List<Car> clientsCars = clientDAO.findCarByClientId(id);
        System.out.println("Clients cars: " + clientsCars);
        for(Car car : clientsCars) {
            clientDTO.getCars().add(car);
        }
        return clientDTO;
    }

    @Override
    public ClientDTO addNewClient(ClientDTO clientDTO) {
        Client client = clientMapper.clientDTOToClient(clientDTO);
        clientDAO.save(client);
        return clientDTO;
    }
}
