package com.example.engineeringThesis.automobileGarageSystem.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

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
    private Client client;
    @OneToMany(mappedBy = "car", cascade = {CascadeType.ALL})
    private List<Repair> repairs;

    public Car() {

    }

    public Car(String nr_vin, String mark, String model, boolean status, String registracion) {
        this.nr_vin = nr_vin;
        this.mark = mark;
        this.model = model;
        this.status = status;
        this.registration = registracion;
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
}
