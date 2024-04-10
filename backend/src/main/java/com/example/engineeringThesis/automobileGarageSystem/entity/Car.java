package com.example.engineeringThesis.automobileGarageSystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Samochod")
@Getter
@Setter
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Setter(AccessLevel.NONE)
    private int id;
    @Column(name = "Numer_VIN")
    private String nr_vin;
    @Column(name = "Marka")
    private String mark;
    @Column(name = "Model")
    private String model;
    @Column(name = "Status_naprawy")
    private boolean status;
    @Column(name = "Nr_rejestracyjny")
    private String registration;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "id_klienta")
    @JsonIgnore
    private Client client;
    @OneToMany(mappedBy = "car", cascade = {CascadeType.ALL})
    private List<Repair> repairs;

    public Car() {

    }

    public Car(String nr_vin, String mark, String model, boolean status, String registration) {
        this.nr_vin = nr_vin;
        this.mark = mark;
        this.model = model;
        this.status = status;
        this.registration = registration;
    }


    @Override
    public String toString() {
        return "Car{" +
                "id=" + id +
                ", nr_vin='" + nr_vin + '\'' +
                ", mark='" + mark + '\'' +
                ", model='" + model + '\'' +
                ", status=" + status +
                ", registracion='" + registration + '\'' +
                '}';
    }

    public void addRepair(Repair tmpRepair) {
        if (repairs == null) {
            repairs = new ArrayList<>();
        }

        repairs.add(tmpRepair);
        tmpRepair.setCar(this);
    }
}
