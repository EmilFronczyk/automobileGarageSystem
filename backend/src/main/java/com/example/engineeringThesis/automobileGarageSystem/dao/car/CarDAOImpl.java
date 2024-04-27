package com.example.engineeringThesis.automobileGarageSystem.dao.car;

import com.example.engineeringThesis.automobileGarageSystem.dto.CarDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import com.example.engineeringThesis.automobileGarageSystem.entity.Client;
import com.example.engineeringThesis.automobileGarageSystem.entity.Repair;
import com.example.engineeringThesis.automobileGarageSystem.mapper.CarMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class CarDAOImpl implements CarDAO {
    //define entity manager
    private final EntityManager entityManager;

    @Autowired
    public CarDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Car theCar) {
        entityManager.persist(theCar);
    }


    @Override
    public Car findById(Integer id) {
        return entityManager.find(Car.class, id);
    }

    @Override
    public List<Car> findAll() {
        TypedQuery<Car> theQuery = entityManager.createQuery("FROM Car", Car.class);
        return theQuery.getResultList();
    }

    @Override
    @Transactional
    public void update(Car theCar) {
        entityManager.merge(theCar);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        Car theCar = entityManager.find(Car.class, id);
        entityManager.remove(theCar);

    }

    @Override
    public Client findClientByCarId(Integer id) {
        TypedQuery<Client> theQuery = entityManager.createQuery("SELECT c.client FROM Car c WHERE c.id = :data", Client.class);
        theQuery.setParameter("data", id);
        return theQuery.getSingleResult();
    }

    @Override
    public Car findByRegistrationNumber(String registration) {
        TypedQuery<Car> theQuery = entityManager.createQuery("SELECT c FROM Car c WHERE c.registration = :data", Car.class);
        theQuery.setParameter("data", registration);
        return theQuery.getSingleResult();
    }

    @Override
    public List<Repair> findRepairByCarId(Integer id) {
        TypedQuery<Repair> theQuery = entityManager.createQuery("SELECT c.repairs FROM Car c WHERE c.id = :data", Repair.class);
        theQuery.setParameter("data", id);
        System.out.println(theQuery.getResultList());
        return theQuery.getResultList();
    }
}
