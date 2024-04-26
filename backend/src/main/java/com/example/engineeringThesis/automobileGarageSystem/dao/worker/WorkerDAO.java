package com.example.engineeringThesis.automobileGarageSystem.dao.worker;
import com.example.engineeringThesis.automobileGarageSystem.entity.Worker;

import java.util.List;

public interface WorkerDAO {
    void save(Worker theWorker);
    Worker findById(Integer id);
    List<Worker> findAll();
    void update(Worker theWorker);
    void delete(Integer id);
    Worker findWorkerByName(String name);
    List<Worker> findCAllOccupiedWorkers ();
}
