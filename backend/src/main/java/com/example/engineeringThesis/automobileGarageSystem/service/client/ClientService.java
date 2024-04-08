package com.example.engineeringThesis.automobileGarageSystem.service.client;

import com.example.engineeringThesis.automobileGarageSystem.dto.ClientDTO;

public interface ClientService {
    ClientDTO getClientById(Integer id);
    ClientDTO addNewClient(ClientDTO clientDTO);
}
