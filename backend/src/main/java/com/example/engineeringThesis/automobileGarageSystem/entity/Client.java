package com.example.engineeringThesis.automobileGarageSystem.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Klient")
@Getter
@Setter
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Setter(AccessLevel.NONE)
    private int id;
    @Column(name = "Imie")
    private String firstName;
    @Column(name = "Nazwisko")
    private String lastName;
    @Column(name = "Numer_telefonu")
    private String phoneNumber;
    @OneToMany(mappedBy = "client", cascade = {CascadeType.ALL})
    private List<Car> cars;

    public Client() {

    }

    public Client(String firstName, String lastName, String phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }


    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }

    public void add(Car tempCar) {
        if (cars == null) {
            cars = new ArrayList<>();
        }

        cars.add(tempCar);
        tempCar.setClient(this);
    }
}
