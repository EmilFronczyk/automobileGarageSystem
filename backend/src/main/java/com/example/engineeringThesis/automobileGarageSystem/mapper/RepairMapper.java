package com.example.engineeringThesis.automobileGarageSystem.mapper;


import com.example.engineeringThesis.automobileGarageSystem.dto.RepairDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Repair;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RepairMapper {
    RepairMapper INSTANCE = Mappers.getMapper(RepairMapper.class);

    @Mapping(source = "title", target = "title")
    @Mapping(source = "date", target = "date")
    RepairDTO repairToRepairDTO (Repair repair);

    @Mapping(source = "title", target = "title")
    @Mapping(source = "date", target = "date")
    Repair repairDTOToRepair (RepairDTO repairDTO);
}
