package com.example.engineeringThesis.automobileGarageSystem.dao.repair;

import com.example.engineeringThesis.automobileGarageSystem.entity.Repair;

import java.util.List;

public interface RepairDAO {
    void save(Repair theRepair);
    Repair findById(Integer id);
    List<Repair> findAll();
    void update(Repair theRepair);
    void delete(Integer id);
}
