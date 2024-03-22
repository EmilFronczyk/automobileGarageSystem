package com.example.engineeringThesis.automobileGarageSystem.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Czesci")
public class Parts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "Nr_katalogowy")
    private String catalogNumber;
    @Column(name = "Nazwa_czesci")
    private String partName;
    @Column(name = "Ilosc")
    private int amount;
    @Column(name = "Cena")
    private int price;

    public Parts() {}

    public Parts(String catalogNumber, int amount, int price, String partName) {
        this.catalogNumber = catalogNumber;
        this.amount = amount;
        this.price = price;
        this.partName = partName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCatalogNumber() {
        return catalogNumber;
    }
    public String getPartName() {
        return partName;
    }

    public void setCatalogNumber(String catalogNumber) {
        this.catalogNumber = catalogNumber;
    }
    public void setPartName(String partName) {
        this.partName = partName;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Parts{" +
                "id=" + id +
                ", catalogNumber='" + catalogNumber + '\'' +
                ", partName='" + partName + '\'' +
                ", amount=" + amount +
                ", price=" + price +
                '}';
    }
}
