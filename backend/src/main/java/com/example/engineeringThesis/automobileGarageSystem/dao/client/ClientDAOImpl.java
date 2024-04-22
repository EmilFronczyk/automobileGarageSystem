package com.example.engineeringThesis.automobileGarageSystem.dao.client;

import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import com.example.engineeringThesis.automobileGarageSystem.entity.Client;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    @Override
    public Client findById(Integer id) {
        return entityManager.find(Client.class, id);
    }

    @Override
    public List<Client> findAll() {
        TypedQuery<Client> theQuery = entityManager.createQuery("FROM Client", Client.class);
        return theQuery.getResultList();
    }

    @Override
    @Transactional
    public void update(Client theClient) {
        entityManager.merge(theClient);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        Client theClient = entityManager.find(Client.class, id);
        entityManager.remove(theClient);

    }

    @Override
    public Client findClientByName(String name) {
        String[] fullName = name.split(" ");
        String firstName = fullName[0];
        String lastName = fullName[1];
        TypedQuery<Client> theQuery = entityManager.createQuery("SELECT c FROM Client c WHERE c.firstName = :firstName AND c.lastName = :lastName", Client.class);
        theQuery.setParameter("firstName", firstName);
        theQuery.setParameter("lastName", lastName);
        return theQuery.getSingleResult();
    }

    @Override
    public List<Car> findCarByClientId(Integer id) {
        TypedQuery<Car> theQuery = entityManager.createQuery("SELECT cl.cars FROM Client cl WHERE cl.id = :data", Car.class);
        theQuery.setParameter("data", id);
        System.out.println(theQuery.getResultList());
        return theQuery.getResultList();
    }

}
