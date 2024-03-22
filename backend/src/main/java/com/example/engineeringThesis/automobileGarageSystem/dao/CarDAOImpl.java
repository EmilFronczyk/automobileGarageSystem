package com.example.engineeringThesis.automobileGarageSystem.dao;

import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class CarDAOImpl implements CarDAO{
    //define entity manager
    private EntityManager entityManager;

    @Autowired
    public CarDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Car theCar) {
        entityManager.persist(theCar);
    }
}
