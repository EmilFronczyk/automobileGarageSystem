package com.example.engineeringThesis.automobileGarageSystem.dao.car;

import com.example.engineeringThesis.automobileGarageSystem.dto.CarDTO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
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

//    @Override
//    public CarDTO findById(Integer id) {
//        Car car =  entityManager.find(Car.class, id);
//        return CarMapper.INSTANCE.carToCarDTO(car);
//    }

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
}
