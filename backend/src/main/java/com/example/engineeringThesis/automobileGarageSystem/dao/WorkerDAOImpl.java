package com.example.engineeringThesis.automobileGarageSystem.dao;

import com.example.engineeringThesis.automobileGarageSystem.entity.Worker;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class WorkerDAOImpl implements WorkerDAO{

    //Define entity manager in order to use constructor injection
    private EntityManager entityManager;

    public WorkerDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Worker theWorker) {
        entityManager.persist(theWorker);
    }
}
