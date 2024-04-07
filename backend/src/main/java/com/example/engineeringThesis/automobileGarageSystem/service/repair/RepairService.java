package com.example.engineeringThesis.automobileGarageSystem.service.repair;

import com.example.engineeringThesis.automobileGarageSystem.dto.RepairDTO;

public interface RepairService {

    RepairDTO getRepairById(Integer id);

    RepairDTO addNewRepair(RepairDTO repairDTO);
}
