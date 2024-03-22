package com.example.engineeringThesis.automobileGarageSystem.dao.parts;
import com.example.engineeringThesis.automobileGarageSystem.entity.Parts;

import java.util.List;

public interface PartsDAO {
    void save(Parts thePart);
    Parts findById(Integer id);
    List<Parts> findAll();
    void update(Parts thePart);
    void deleteById(Integer id);
}
