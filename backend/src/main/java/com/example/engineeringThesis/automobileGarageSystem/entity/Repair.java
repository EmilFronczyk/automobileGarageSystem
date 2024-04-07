package com.example.engineeringThesis.automobileGarageSystem.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

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
    private Car car;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "id_pracownika")
    private Worker worker;

    @OneToMany(mappedBy = "repair")
    List<PartsInRepair> partsUsed;

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


}
