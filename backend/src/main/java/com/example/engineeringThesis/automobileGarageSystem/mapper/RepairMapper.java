package com.example.engineeringThesis.automobileGarageSystem.mapper;


import com.example.engineeringThesis.automobileGarageSystem.dao.worker.WorkerDAO;
import com.example.engineeringThesis.automobileGarageSystem.dto.RepairDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Repair;
import com.example.engineeringThesis.automobileGarageSystem.entity.Worker;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface RepairMapper {
    RepairMapper INSTANCE = Mappers.getMapper(RepairMapper.class);

    @Mapping(source = "title", target = "title")
    @Mapping(source = "date", target = "date")
    @Mapping(source = "worker", target = "worker", qualifiedByName = "concatenateName")
    RepairDTO repairToRepairDTO (Repair repair);

    @Mapping(source = "title", target = "title")
    @Mapping(source = "date", target = "date")
    @Mapping(target = "worker", ignore = true)
    Repair repairDTOToRepair (RepairDTO repairDTO);

    @Named("concatenateName")
    default String concatenateName(Worker worker) {
        return worker.getFirstName() + " " + worker.getLastName();
    }

//    @Named("splitName")
//    default Worker splitName(String workerName) {
//        Worker worker =
//
//    }

//    default Worker map(String value) {
//        Worker worker = new Worker();
//        String[] parts = value.split(" ");
//        worker.setFirstName(parts[0]);
//        worker.setLastName(parts[1]);
//        return worker;
//    }
}
