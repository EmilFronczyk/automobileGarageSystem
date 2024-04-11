package com.example.engineeringThesis.automobileGarageSystem.service.repair;

import com.example.engineeringThesis.automobileGarageSystem.dto.RepairDTO;

import java.util.List;

public interface RepairService {

    RepairDTO getRepairById(Integer id);

    RepairDTO addNewRepair(RepairDTO repairDTO);

    List<RepairDTO> getAllRepairs();
}
