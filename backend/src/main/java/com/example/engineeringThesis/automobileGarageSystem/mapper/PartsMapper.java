package com.example.engineeringThesis.automobileGarageSystem.mapper;

import com.example.engineeringThesis.automobileGarageSystem.dto.PartsDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Parts;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PartsMapper {
    PartsMapper INSTANCE = Mappers.getMapper(PartsMapper.class);

    @Mapping(source = "catalogNumber", target = "catalogNumber")
    @Mapping(source = "partName", target = "partName")
    @Mapping(source = "amount", target = "amount")
    @Mapping(source = "price", target = "price")
    PartsDTO partsToPartsDTO(Parts parts);

    @Mapping(source = "catalogNumber", target = "catalogNumber")
    @Mapping(source = "partName", target = "partName")
    @Mapping(source = "amount", target = "amount")
    @Mapping(source = "price", target = "price")
    Parts partsDTOToParts(PartsDTO partsDTO);
}
