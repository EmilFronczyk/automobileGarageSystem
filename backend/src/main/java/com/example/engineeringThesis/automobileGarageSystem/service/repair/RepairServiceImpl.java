package com.example.engineeringThesis.automobileGarageSystem.service.repair;

import com.example.engineeringThesis.automobileGarageSystem.dao.car.CarDAO;
import com.example.engineeringThesis.automobileGarageSystem.dao.repair.RepairDAO;
import com.example.engineeringThesis.automobileGarageSystem.dao.worker.WorkerDAO;
import com.example.engineeringThesis.automobileGarageSystem.dto.RepairDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import com.example.engineeringThesis.automobileGarageSystem.entity.Repair;
import com.example.engineeringThesis.automobileGarageSystem.entity.Worker;
import com.example.engineeringThesis.automobileGarageSystem.mapper.RepairMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RepairServiceImpl implements RepairService{

    private final RepairDAO repairDAO;
    private final CarDAO carDAO;
    private final WorkerDAO workerDAO;
    private final RepairMapper repairMapper;

    @Autowired
    public RepairServiceImpl(RepairDAO repairDAO, CarDAO carDAO, WorkerDAO workerDAO, RepairMapper repairMapper) {
        this.repairDAO = repairDAO;
        this.carDAO = carDAO;
        this.workerDAO = workerDAO;
        this.repairMapper = repairMapper;
    }

    @Override
    public RepairDTO getRepairById(Integer id) {
        Repair repair = repairDAO.findById(id);
        RepairDTO repairDTO =  RepairMapper.INSTANCE.repairToRepairDTO(repair);
        repairDTO.setWorker(repairDAO.findWorkerByRepairId(id).getFirstName() + " " + repairDAO.findWorkerByRepairId(id).getLastName());
        repairDTO.setVehicle(repairDAO.findCarByRepairId(id).getMark() + " " + repairDAO.findCarByRepairId(id).getModel());
        repairDTO.setRegistration(repairDAO.findCarByRepairId(id).getRegistration());
        repairDTO.setStatus(repairDAO.findCarByRepairId(id).isStatus());
        repairDTO.setClient(carDAO.findClientByCarId(repairDAO.findCarByRepairId(id).getId()).getFirstName() + " "
                                                    + carDAO.findClientByCarId(repairDAO.findCarByRepairId(id).getId()).getLastName());
        return repairDTO;
    }

    @Override
    public RepairDTO addNewRepair(RepairDTO repairDTO) {
        Repair repair = repairMapper.repairDTOToRepair(repairDTO);
        Car car = carDAO.findByRegistrationNumber(repairDTO.getRegistration());
        Worker worker = workerDAO.findWorkerByName(repairDTO.getWorker());
        car.setStatus(repairDTO.isStatus());
        car.addRepair(repair);
        worker.addRepair(repair);
        repairDAO.save(repair);
        return repairDTO;
    }
}
