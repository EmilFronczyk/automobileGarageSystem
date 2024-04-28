package com.example.engineeringThesis.automobileGarageSystem.dao.partsInRepair;

import com.example.engineeringThesis.automobileGarageSystem.entity.PartsInRepair;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PartsInRepairDAOImpl implements PartsInRepairDAO{
    private EntityManager entityManager;

    @Autowired
    public PartsInRepairDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Integer getAmountOfUsedPartsByRepairIdAndPartId(Integer id1, Integer id2) {
        TypedQuery<Integer> theQuery = entityManager.createQuery("SELECT p.amountOfUsedParts FROM PartsInRepair p WHERE p.repair.id = :repairId AND p.part.id = :partId", Integer.class);
        theQuery.setParameter("repairId", id1);
        theQuery.setParameter("partId", id2);
        return theQuery.getSingleResult();
    }

    @Override
    public PartsInRepair findPartInRepairByRepairAndPartId(Integer id1, Integer id2) {
        TypedQuery<PartsInRepair> theQuery = entityManager.createQuery("SELECT p FROM PartsInRepair p WHERE p.repair.id = :repairId AND p.part.id = :partId", PartsInRepair.class);
        theQuery.setParameter("repairId", id1);
        theQuery.setParameter("partId", id2);
        return theQuery.getSingleResult();
    }


}
