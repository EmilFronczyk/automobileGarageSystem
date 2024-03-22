package com.example.engineeringThesis.automobileGarageSystem.dao;

import com.example.engineeringThesis.automobileGarageSystem.entity.Client;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ClientDAOImpl implements ClientDAO {

    private EntityManager entityManager;

    @Autowired
    public ClientDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Client theClient) {
        entityManager.persist(theClient);

    }
}
