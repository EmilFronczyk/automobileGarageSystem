package com.example.engineeringThesis.automobileGarageSystem.controller;

import com.example.engineeringThesis.automobileGarageSystem.dto.ClientDTO;
import com.example.engineeringThesis.automobileGarageSystem.service.client.ClientService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/{id}")
    public ClientDTO getClientById(@PathVariable Integer id) {
        return clientService.getClientById(id);
    }

    @PostMapping()
    public ClientDTO addClient(@RequestBody ClientDTO clientDTO) {
        return clientService.addNewClient(clientDTO);
    }
}
