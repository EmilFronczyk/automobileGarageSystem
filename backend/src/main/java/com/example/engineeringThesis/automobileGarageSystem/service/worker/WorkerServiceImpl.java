package com.example.engineeringThesis.automobileGarageSystem.service.worker;

import com.example.engineeringThesis.automobileGarageSystem.dao.worker.WorkerDAO;
import com.example.engineeringThesis.automobileGarageSystem.dto.WorkerDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Worker;
import com.example.engineeringThesis.automobileGarageSystem.mapper.WorkerMapper;
import org.springframework.stereotype.Service;

@Service
public class WorkerServiceImpl implements  WorkerService {

    private final WorkerMapper workerMapper;

    private final WorkerDAO workerDAO;

    public WorkerServiceImpl(WorkerMapper workerMapper, WorkerDAO workerDAO) {
        this.workerMapper = workerMapper;
        this.workerDAO = workerDAO;
    }

    @Override
    public WorkerDTO getWorkerById(Integer id) {
        return WorkerMapper.INSTANCE.workerToWorkerDTO(workerDAO.findById(id));
    }

    @Override
    public WorkerDTO addNewWorker(WorkerDTO workerDTO) {
        Worker worker = workerMapper.workerDTOToWorker(workerDTO);
        workerDAO.save(worker);
        return workerDTO;
    }
}
