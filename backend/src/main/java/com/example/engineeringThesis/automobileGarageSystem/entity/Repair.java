package com.example.engineeringThesis.automobileGarageSystem.entity;

import com.example.engineeringThesis.automobileGarageSystem.dao.parts.PartsDAO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.util.SerializationUtils;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Naprawa")
@Getter
@Setter
public class Repair {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Setter(AccessLevel.NONE)
    private int id;

    @Column(name = "Tytul_naprawy")
    private String title;
    @Column(name = "Data_naprawy")
    private String date;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "id_samochodu")
    @JsonIgnore
    private Car car;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "id_pracownika")
    @JsonIgnore
    private Worker worker;

    @OneToMany(mappedBy = "repair", cascade = {CascadeType.ALL})
    @JsonIgnore
    private List<PartsInRepair> amountOfPartsUsed;


    public Repair() {}

    public Repair(String title, String date) {
        this.title = title;
        this.date = date;
    }


    @Override
    public String toString() {
        return "Repair{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", date='" + date + '\'' +
                '}';
    }

    public void addPart(Parts tmpPart, int amount) {
        if(amountOfPartsUsed == null) {
            amountOfPartsUsed = new ArrayList<>();
        }
        PartsInRepair partsInRepair = new PartsInRepair(this, tmpPart, amount);
        amountOfPartsUsed.add(partsInRepair);
        tmpPart.setAmount(tmpPart.getAmount()-amount);
    }

}

