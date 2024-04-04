package com.example.engineeringThesis.automobileGarageSystem.mapper;

import com.example.engineeringThesis.automobileGarageSystem.dto.CarDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CarMapper {
    CarMapper INSTANCE = Mappers.getMapper(CarMapper.class);

    @Mapping(source = "mark", target = "mark")
    @Mapping(source = "model", target = "model")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "registration", target = "registration")
    CarDTO carToCarDTO(Car car);

    @Mapping(source = "mark", target = "mark")
    @Mapping(source = "model", target = "model")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "registration", target = "registration")
    Car carDTOToCar(CarDTO carDTO);
}
