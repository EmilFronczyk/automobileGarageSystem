package com.example.engineeringThesis.automobileGarageSystem.controller;

import com.example.engineeringThesis.automobileGarageSystem.dto.WorkerDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Worker;
import com.example.engineeringThesis.automobileGarageSystem.service.worker.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workers")
@CrossOrigin(origins = "http://localhost:3000")
public class  WorkerController {

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

    @GetMapping("/all")
    public List<WorkerDTO> getAllWorkers() {
        return workerService.getAllWorkers();
    }

    @GetMapping("/allOccupied")
    public List<WorkerDTO> getAllOccupiedWorkers() {
        return workerService.getAllOccupiedWorkers();
    }

    @DeleteMapping("/{id}")
    public String deleteWorkerById(@PathVariable Integer id) {
        return workerService.deleteWorkerById(id);
    }

    @PutMapping()
    public WorkerDTO updateWorker(@RequestBody WorkerDTO workerDTO) {
        return workerService.updateWorker(workerDTO);
    }
}
