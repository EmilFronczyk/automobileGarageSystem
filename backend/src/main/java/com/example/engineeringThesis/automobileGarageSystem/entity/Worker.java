package com.example.engineeringThesis.automobileGarageSystem.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Pracownicy")
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public int getPayRate() {
        return payRate;
    }

    public void setPayRate(int payRate) {
        this.payRate = payRate;
    }

    public String getHireDate() {
        return hireDate;
    }

    public void setHireDate(String hireDate) {
        this.hireDate = hireDate;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
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
