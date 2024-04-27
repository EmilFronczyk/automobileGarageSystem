package com.example.engineeringThesis.automobileGarageSystem.service.worker;

import com.example.engineeringThesis.automobileGarageSystem.dao.worker.WorkerDAO;
import com.example.engineeringThesis.automobileGarageSystem.dto.WorkerDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Worker;
import com.example.engineeringThesis.automobileGarageSystem.mapper.WorkerMapper;
import org.hibernate.jdbc.Work;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public List<WorkerDTO> getAllWorkers() {
        List<Worker> workers = workerDAO.findAll();
        return workers.stream()
                .map(workerMapper::workerToWorkerDTO)
                .collect(Collectors.toList());
    }

    @Override
    public String deleteWorkerById(Integer id) {
        WorkerDTO workerDTO = WorkerMapper.INSTANCE.workerToWorkerDTO(workerDAO.findById(id));
        workerDAO.delete(id);
        return "Worker: " + workerDTO.getFirstName() + " " + workerDTO.getLastName() + " was deleted";
    }

    @Override
    public WorkerDTO updateWorker(WorkerDTO workerDTO) {
        Worker worker = workerDAO.findWorkerByName(workerDTO.getFirstName() + " "+workerDTO.getLastName());
        worker.setLastName(workerDTO.getLastName());
        worker.setPosition(workerDTO.getPosition());
        worker.setPayRate(workerDTO.getPayRate());
        worker.setPhoneNumber(workerDTO.getPhoneNumber());
        workerDAO.update(worker);
        return workerDTO;

    }

    @Override
    public List<WorkerDTO> getAllOccupiedWorkers() {
        List<Worker> workers = workerDAO.findCAllOccupiedWorkers();
        return workers.stream()
                .map((workerMapper::workerToWorkerDTO))
                .collect(Collectors.toList());
    }


}
