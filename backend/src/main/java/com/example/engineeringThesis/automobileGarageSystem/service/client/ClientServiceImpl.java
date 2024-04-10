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
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements ClientService{

    private final ClientMapper clientMapper;
    private final ClientDAO clientDAO;

    @Autowired
    public ClientServiceImpl(ClientMapper clientMapper, ClientDAO clientDAO) {
        this.clientMapper = clientMapper;
        this.clientDAO = clientDAO;
    }

    public List<Car> filerClientCars(Integer id) {
        List<Car> clientsCars = clientDAO.findCarByClientId(id);
        return clientsCars.stream()
                .map(car -> {
                    Car filteredCar = new Car();
                    filteredCar.setMark(car.getMark());
                    filteredCar.setModel(car.getModel());
                    return filteredCar;
                })
                .toList();
    }

    @Override
    public String deleteClientById(Integer id) {
        ClientDTO clientDTO = ClientMapper.INSTANCE.clientToClientDTO(clientDAO.findById(id));
        clientDAO.deleteById(id);
        return "Client: " + clientDTO.getFirstName() + " " + clientDTO.getLastName() + " was deleted";
    }

    @Override
    public ClientDTO getClientById(Integer id) {
        Client client = clientDAO.findById(id);
        if (client == null) {
            return null;
        }
        ClientDTO clientDTO = ClientMapper.INSTANCE.clientToClientDTO(client);
        clientDTO.setCars(filerClientCars(id));
        return clientDTO;
    }

    @Override
    public ClientDTO addNewClient(ClientDTO clientDTO) {
        Client client = clientMapper.clientDTOToClient(clientDTO);
        clientDAO.save(client);
        return clientDTO;
    }

    @Override
    public List<ClientDTO> getAllClients() {
        List<Client> clients = clientDAO.findAll();
        clients.forEach(client -> {
                client.setCars(filerClientCars(client.getId()));
            });
        //mapowanie Client do ClientDTO
        return clients.stream()
                .map(clientMapper::clientToClientDTO)
                .collect(Collectors.toList());
    }
}
