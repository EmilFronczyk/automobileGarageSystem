package com.example.engineeringThesis.automobileGarageSystem.dao.repair;

import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import com.example.engineeringThesis.automobileGarageSystem.entity.Repair;
import com.example.engineeringThesis.automobileGarageSystem.entity.Worker;
import org.hibernate.jdbc.Work;

import java.util.List;

public interface RepairDAO {
    void save(Repair theRepair);
    Repair findById(Integer id);
    List<Repair> findAll();
    void update(Repair theRepair);
    void delete(Integer id);
    Worker findWorkerByRepairId(Integer id);

    Car findCarByRepairId(Integer id);
}
