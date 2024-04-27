package com.example.engineeringThesis.automobileGarageSystem.service.repair;

import com.example.engineeringThesis.automobileGarageSystem.dao.car.CarDAO;
import com.example.engineeringThesis.automobileGarageSystem.dao.parts.PartsDAO;
import com.example.engineeringThesis.automobileGarageSystem.dao.partsInRepair.PartsInRepairDAO;
import com.example.engineeringThesis.automobileGarageSystem.dao.repair.RepairDAO;
import com.example.engineeringThesis.automobileGarageSystem.dao.worker.WorkerDAO;
import com.example.engineeringThesis.automobileGarageSystem.dto.RepairDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.*;
import com.example.engineeringThesis.automobileGarageSystem.mapper.RepairMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static java.lang.Math.round;

@Service
public class RepairServiceImpl implements RepairService{

    private final RepairDAO repairDAO;
    private final CarDAO carDAO;
    private final WorkerDAO workerDAO;
    private final PartsDAO partsDAO;
    private final PartsInRepairDAO partsInRepairDAO;
    private final RepairMapper repairMapper;

    @Autowired
    public RepairServiceImpl(RepairDAO repairDAO, CarDAO carDAO, WorkerDAO workerDAO, PartsDAO partsDAO, PartsInRepairDAO partsInRepairDAO, RepairMapper repairMapper) {
        this.repairDAO = repairDAO;
        this.carDAO = carDAO;
        this.workerDAO = workerDAO;
        this.partsDAO = partsDAO;
        this.partsInRepairDAO = partsInRepairDAO;
        this.repairMapper = repairMapper;
    }

    public List<Parts> getPartsUsedInRepair(Repair repair) {
        List<Parts> parts = new ArrayList<>();
        if (repair.getAmountOfPartsUsed() != null) {
            for (PartsInRepair partsInRepair : repair.getAmountOfPartsUsed()) {

                partsInRepair.getPart().setAmount(partsInRepair.getAmountOfUsedParts());
                parts.add(partsInRepair.getPart());
            }
        }
        return parts;
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

        repairDTO.setParts(getPartsUsedInRepair(repair));
        repairDTO.setCostOfRepair(calculateCostOfSingleRepair(repair.getId()));
        repairDTO.setSpending(calculateSpendingFromSingleRepair(repair.getId()));
        repairDTO.setIncome(calculateIncomeFromSingleRepair(repair.getId()));
        return repairDTO;
    }

    @Override
    public RepairDTO addNewRepair(RepairDTO repairDTO) {
        Repair repair = repairMapper.repairDTOToRepair(repairDTO);
        Car car = carDAO.findByRegistrationNumber(repairDTO.getRegistration());
        Worker worker = workerDAO.findWorkerByName(repairDTO.getWorker());
        List<Parts> usedParts = repairDTO.getParts();
        usedParts.forEach((usedPart -> {
            Parts part = partsDAO.getPartByCatalogNumber(usedPart.getCatalogNumber());
            repair.addPart(part, usedPart.getAmount());
        }));
        car.setStatus(repairDTO.isStatus());
        car.addRepair(repair);
        worker.addRepair(repair);
        repairDAO.save(repair);
        return repairDTO;
    }

    @Override
    public List<RepairDTO> getAllRepairs() {
        List<Repair> repairs = repairDAO.findAll();
        return repairs.stream()
                .map(repair -> {
                    RepairDTO repairDTO = repairMapper.repairToRepairDTO(repair);
                    repairDTO.setWorker(repair.getWorker().getFirstName() + " " + repair.getWorker().getLastName());
                    repairDTO.setVehicle(repair.getCar().getMark() + " " + repair.getCar().getModel());
                    repairDTO.setRegistration(repair.getCar().getRegistration());
                    repairDTO.setStatus(repair.getCar().isStatus());
                    repairDTO.setClient(repair.getCar().getClient().getFirstName() + " "
                            + repair.getCar().getClient().getLastName());
                    repairDTO.setParts(getPartsUsedInRepair(repair));
                    repairDTO.setCostOfRepair(calculateCostOfSingleRepair(repair.getId()));
                    repairDTO.setSpending(calculateSpendingFromSingleRepair(repair.getId()));
                    repairDTO.setIncome(calculateIncomeFromSingleRepair(repair.getId()));
                    return repairDTO;
                })
                .collect(Collectors.toList());
    }

    @Override
    public RepairDTO updateRepair(RepairDTO repairDTO) {
        Repair repair = repairDAO.findById(repairDTO.getId());
        repair.setTitle(repairDTO.getTitle());
        List<Parts> updatedParts = repairDTO.getParts();
        updatedParts.forEach((updatedPart -> {
            Parts part = partsDAO.getPartByCatalogNumber(updatedPart.getCatalogNumber());
            if ( partsInRepairDAO.getAmountOfUsedPartsByRepairIdAndPartId(repair.getId(), part.getId())> updatedPart.getAmount()) {
                System.out.println("UDALO SIE W KONCU!");

            } else if ( partsInRepairDAO.getAmountOfUsedPartsByRepairIdAndPartId(repair.getId(), part.getId()) < updatedPart.getAmount()) {
                System.out.println("UDALO SIE W KONCU ale od innej strony xd!");

            }
            //repair.addPart(part, updatedPart.getAmount());
            part.setAmount(part.getAmount()-updatedPart.getAmount());

        }));
        repairDAO.update(repair);
        return repairDTO;

    }

    @Override
    public String deleteRepairById(Integer id) {
        RepairDTO repairDTO = RepairMapper.INSTANCE.repairToRepairDTO(repairDAO.findById(id));
        repairDAO.delete(id);
        return "Repair part : " + repairDTO.getTitle();
    }


    public double calculateIncomeFromSingleRepair(Integer id) {
        return calculateCostOfSingleRepair(id)- calculateSpendingFromSingleRepair(id);
    }


    public int calculateSpendingFromSingleRepair(Integer id) {
        Worker worker = repairDAO.findWorkerByRepairId(id);
        return worker.getPayRate() *8;
    }

    public double calculateCostOfSingleRepair(Integer id) {
        Repair repair = repairDAO.findById(id);
        double cost;
        if (repair.getAmountOfPartsUsed() != null) {
            System.out.println("Warunek repair.getAmountOfPartsUsed() != null zawsze jest true");
            int costOfUsedParts = 0;
            for (PartsInRepair partsInRepair : repair.getAmountOfPartsUsed()) {
                costOfUsedParts += partsInRepair.getPart().getPrice() * partsInRepair.getAmountOfUsedParts();
            }
            cost = ((costOfUsedParts + calculateSpendingFromSingleRepair(repair.getId())) * 1.2);
        } else {
            cost = (calculateSpendingFromSingleRepair(repair.getId()) *1.2);
        }
        return Math.round(cost*100.0)/100.0;
    }

}
