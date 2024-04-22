package com.example.engineeringThesis.automobileGarageSystem.service.parts;

import com.example.engineeringThesis.automobileGarageSystem.dto.PartsDTO;

import java.util.List;

public interface PartsService {

    PartsDTO getPartById(Integer id);

    PartsDTO addNewPart(PartsDTO partsDTO);

    PartsDTO updatePart(PartsDTO partsDTO);

    String deletePartById(Integer id);
    List<PartsDTO> getAllParts();
}
