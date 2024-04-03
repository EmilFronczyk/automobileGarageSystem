package com.example.engineeringThesis.automobileGarageSystem.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "Pracownicy")
@Getter
@Setter
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Setter(AccessLevel.NONE)
    private int id;
    @Column(name = "Imie")
    private String firstName;
    @Column(name = "Nazwisko")
    private String lastName;
    @Column(name = "Stanowisko")
    private String position;
    @Column(name = "Stawka_zl_h")
    private int payRate ;
    @Column(name = "Data_zatrudnienia")
    private String hireDate;
    @Column (name = "Kontakt")
    private String phoneNumber;
    @OneToMany(mappedBy = "worker", cascade = {CascadeType.ALL})
    private List<Repair> repairs;

    public Worker() {

    }

    public Worker(String firstName, String lastName, String position, int payRate, String hireDate, String phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.payRate = payRate;
        this.hireDate = hireDate;
        this.phoneNumber = phoneNumber;
    }



    @Override
    public String toString() {
        return "Worker{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", position='" + position + '\'' +
                ", payRate=" + payRate +
                ", hireDate='" + hireDate + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}
