package com.example.engineeringThesis.automobileGarageSystem.controller;

import com.example.engineeringThesis.automobileGarageSystem.dto.WorkerDTO;
import com.example.engineeringThesis.automobileGarageSystem.service.worker.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workers")
public class WorkerController {

    private final WorkerService workerService;

    @Autowired
    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    @GetMapping("/{id}")
    public WorkerDTO getWorkerById(@PathVariable Integer id) {
        return workerService.getWorkerById(id);
    }

    @PostMapping()
    public WorkerDTO addWorker(@RequestBody WorkerDTO workerDTO) {
        return workerService.addNewWorker(workerDTO);
    }
}
