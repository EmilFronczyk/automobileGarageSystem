package com.example.engineeringThesis.automobileGarageSystem.dao.repair;

import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import com.example.engineeringThesis.automobileGarageSystem.entity.Repair;
import com.example.engineeringThesis.automobileGarageSystem.entity.Worker;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class RepairDAOImpl implements RepairDAO {
    private EntityManager entityManager;

    @Autowired
    public RepairDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Repair theRepair) {
        entityManager.persist(theRepair);
    }
    @Override
    public Repair findById(Integer id) {
        return entityManager.find(Repair.class, id);
    }

    @Override
    public List<Repair> findAll() {
        TypedQuery<Repair> theQuery = entityManager.createQuery("FROM Repair", Repair.class);
        return theQuery.getResultList();
    }

    @Override
    @Transactional
    public void update(Repair theRepair) {
        entityManager.merge(theRepair);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        Repair theRepair = entityManager.find(Repair.class, id);
        entityManager.remove(theRepair);

    }

    @Override
    public Worker findWorkerByRepairId(Integer id) {
        TypedQuery<Worker> theQuery = entityManager.createQuery("SELECT r.worker FROM Repair r WHERE r.id = :data", Worker.class);
        theQuery.setParameter("data", id);
        return theQuery.getSingleResult();
    }

    @Override
    public Car findCarByRepairId(Integer id) {
        TypedQuery<Car> theQuery = entityManager.createQuery("SELECT r.car FROM Repair r WHERE r.id = :data", Car.class);
        theQuery.setParameter("data", id);
        return theQuery.getSingleResult();
    }
}
