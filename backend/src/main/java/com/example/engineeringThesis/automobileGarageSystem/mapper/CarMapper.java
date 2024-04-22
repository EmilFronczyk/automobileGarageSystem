package com.example.engineeringThesis.automobileGarageSystem.mapper;

import com.example.engineeringThesis.automobileGarageSystem.dto.CarDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import com.example.engineeringThesis.automobileGarageSystem.entity.Client;
import com.example.engineeringThesis.automobileGarageSystem.entity.Worker;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CarMapper {
    CarMapper INSTANCE = Mappers.getMapper(CarMapper.class);

    @Mapping(source = "mark", target = "mark")
    @Mapping(source = "model", target = "model")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "registration", target = "registration")
    @Mapping(source = "nr_vin", target = "nr_vin")
    @Mapping(source = "client", target = "client", qualifiedByName = "concatenateName")
    @Mapping(source = "repairs", target = "repairs")
    CarDTO carToCarDTO(Car car);

    @Mapping(source = "mark", target = "mark")
    @Mapping(source = "model", target = "model")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "registration", target = "registration")
    @Mapping(source = "nr_vin", target = "nr_vin")
    @Mapping(target = "client", ignore = true)
    @Mapping(source = "repairs", target = "repairs")
    Car carDTOToCar(CarDTO carDTO);

    @Named("concatenateName")
    default String concatenateName(Client client) {
        return client.getFirstName() + " " + client.getLastName();
    }
}
