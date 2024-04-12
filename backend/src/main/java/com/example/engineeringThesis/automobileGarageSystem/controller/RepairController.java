package com.example.engineeringThesis.automobileGarageSystem.controller;

import com.example.engineeringThesis.automobileGarageSystem.dto.RepairDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Repair;
import com.example.engineeringThesis.automobileGarageSystem.service.repair.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/all")
    public List<RepairDTO> getAllRepairs() {
        return repairService.getAllRepairs();
    }

    @DeleteMapping("/{id}")
    public String deleteRepairById(@PathVariable Integer id) {
        return repairService.deleteRepairById(id);
    }
}
