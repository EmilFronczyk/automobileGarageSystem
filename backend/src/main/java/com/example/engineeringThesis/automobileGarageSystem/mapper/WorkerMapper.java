package com.example.engineeringThesis.automobileGarageSystem.mapper;

import com.example.engineeringThesis.automobileGarageSystem.dto.WorkerDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Worker;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface WorkerMapper {

    WorkerMapper INSTANCE = Mappers.getMapper(WorkerMapper.class);

    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "lastName", target = "lastName")
    @Mapping(source = "position", target = "position")
    @Mapping(source = "payRate", target = "payRate")
    @Mapping(source = "phoneNumber", target = "phoneNumber")
    WorkerDTO workerToWorkerDTO(Worker worker);

    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "lastName", target = "lastName")
    @Mapping(source = "position", target = "position")
    @Mapping(source = "payRate", target = "payRate")
    @Mapping(source = "phoneNumber", target = "phoneNumber")
    Worker workerDTOToWorker(WorkerDTO workerDTO);
}
