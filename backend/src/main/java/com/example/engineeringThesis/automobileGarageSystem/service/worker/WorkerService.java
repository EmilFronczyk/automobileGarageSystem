package com.example.engineeringThesis.automobileGarageSystem.service.worker;

import com.example.engineeringThesis.automobileGarageSystem.dto.WorkerDTO;

import java.util.List;

public interface WorkerService {

    WorkerDTO getWorkerById(Integer id);

    WorkerDTO addNewWorker(WorkerDTO workerDTO);

    List<WorkerDTO> getAllWorkers();

    String deleteWorkerById(Integer id);

    WorkerDTO updateWorker(WorkerDTO workerDTO);

    List<WorkerDTO> getAllOccupiedWorkers();
}
