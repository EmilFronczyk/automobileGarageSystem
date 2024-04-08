package com.example.engineeringThesis.automobileGarageSystem.service.parts;

import com.example.engineeringThesis.automobileGarageSystem.dao.parts.PartsDAO;
import com.example.engineeringThesis.automobileGarageSystem.dto.PartsDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Parts;
import com.example.engineeringThesis.automobileGarageSystem.mapper.PartsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PartsServiceImpl implements PartsService{

    private final PartsMapper partsMapper;

    private final PartsDAO partsDAO;

    @Autowired
    public PartsServiceImpl(PartsMapper partsMapper, PartsDAO partsDAO) {
        this.partsMapper = partsMapper;
        this.partsDAO = partsDAO;
    }

    @Override
    public PartsDTO getPartById(Integer id) {
        return PartsMapper.INSTANCE.partsToPartsDTO(partsDAO.findById(id));
    }

    @Override
    public PartsDTO addNewPart(PartsDTO partsDTO) {
        Parts parts = partsMapper.partsDTOToParts(partsDTO);
        partsDAO.save(parts);
        return partsDTO;
    }

    @Override
    public PartsDTO updatePart(PartsDTO partsDTO) {
        Parts part = partsDAO.getPartByCatalogNumber(partsDTO.getCatalogNumber());
        part.setAmount(partsDTO.getAmount());
        part.setPrice(partsDTO.getPrice());
        partsDAO.update(part);
        return partsDTO;
    }
}