package com.example.engineeringThesis.automobileGarageSystem.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Samochod")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
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
    private String registracion;

    public Car() {

    }

    public Car(String nr_vin, String mark, String model, boolean status, String registracion) {
        this.nr_vin = nr_vin;
        this.mark = mark;
        this.model = model;
        this.status = status;
        this.registracion = registracion;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNr_vin() {
        return nr_vin;
    }

    public void setNr_vin(String nr_vin) {
        this.nr_vin = nr_vin;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getRegistracion() {
        return registracion;
    }

    public void setRegistracion(String registracion) {
        this.registracion = registracion;
    }

    @Override
    public String toString() {
        return "Car{" +
                "id=" + id +
                ", nr_vin='" + nr_vin + '\'' +
                ", mark='" + mark + '\'' +
                ", model='" + model + '\'' +
                ", status=" + status +
                ", registracion='" + registracion + '\'' +
                '}';
    }
}
