package com.example.engineeringThesis.automobileGarageSystem.dao.client;

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
}
