package com.example.engineeringThesis.automobileGarageSystem.dao.partsInRepair;

import com.example.engineeringThesis.automobileGarageSystem.entity.PartsInRepair;

public interface PartsInRepairDAO {
    Integer getAmountOfUsedPartsByRepairIdAndPartId (Integer id1, Integer id2);

    PartsInRepair findPartInRepairByRepairAndPartId (Integer id1, Integer id2);

    void save(PartsInRepair partInRepair);
}
