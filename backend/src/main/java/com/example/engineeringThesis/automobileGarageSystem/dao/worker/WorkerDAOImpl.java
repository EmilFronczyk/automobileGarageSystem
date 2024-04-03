package com.example.engineeringThesis.automobileGarageSystem.dao.worker;

import com.example.engineeringThesis.automobileGarageSystem.entity.Worker;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class WorkerDAOImpl implements WorkerDAO {

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
    @Override
    public Worker findById(Integer id) {
        return entityManager.find(Worker.class, id);
    }

    @Override
    public List<Worker> findAll() {
        TypedQuery<Worker> theQuery = entityManager.createQuery("FROM Worker", Worker.class);
        return theQuery.getResultList();
    }

    @Override
    @Transactional
    public void update(Worker theWorker) {
        entityManager.merge(theWorker);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        Worker theWorker = entityManager.find(Worker.class, id);
        entityManager.remove(theWorker);

    }
}