package com.example.engineeringThesis.automobileGarageSystem.controller;

import com.example.engineeringThesis.automobileGarageSystem.dto.RepairDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Repair;
import com.example.engineeringThesis.automobileGarageSystem.service.repair.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/repairs")
public class RepairController {

    private final RepairService repairService;

    @Autowired
    public RepairController(RepairService repairService) {
        this.repairService = repairService;
    }

    @GetMapping("/{id}")
    public RepairDTO getRepairById(@PathVariable Integer id) {
        return repairService.getRepairById(id);
    }

    @PostMapping()
    public RepairDTO addRepair(@RequestBody RepairDTO repairDTO) {
        return repairService.addNewRepair(repairDTO);
    }
}