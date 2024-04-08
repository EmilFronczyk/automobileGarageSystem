package com.example.engineeringThesis.automobileGarageSystem.service.worker;

import com.example.engineeringThesis.automobileGarageSystem.dto.WorkerDTO;

public interface WorkerService {

    WorkerDTO getWorkerById(Integer id);

    WorkerDTO addNewWorker(WorkerDTO workerDTO);
}
