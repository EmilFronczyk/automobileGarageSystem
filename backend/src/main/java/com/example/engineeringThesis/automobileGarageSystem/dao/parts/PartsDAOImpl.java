package com.example.engineeringThesis.automobileGarageSystem.dao.parts;

import com.example.engineeringThesis.automobileGarageSystem.entity.Parts;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class PartsDAOImpl implements PartsDAO {
    private EntityManager entityManager;

    @Autowired
    public PartsDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Parts thePart) {
        entityManager.persist(thePart);
    }
    @Override
    public Parts findById(Integer id) {
        return entityManager.find(Parts.class, id);
    }

    @Override
    public List<Parts> findAll() {
        TypedQuery<Parts> theQuery = entityManager.createQuery("FROM Parts", Parts.class);
        return theQuery.getResultList();
    }

    @Override
    @Transactional
    public void update(Parts thePart) {
        entityManager.merge(thePart);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        Parts thePart = entityManager.find(Parts.class, id);
        entityManager.remove(thePart);


    }
}
