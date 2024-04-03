package com.example.engineeringThesis.automobileGarageSystem.entity;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "Czesci")
@Getter
@Setter
public class Parts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Setter(AccessLevel.NONE)
    private int id;
    @Column(name = "Nr_katalogowy")
    private String catalogNumber;
    @Column(name = "Nazwa_czesci")
    private String partName;
    @Column(name = "Ilosc")
    private int amount;
    @Column(name = "Cena")
    private int price;

    @OneToMany(mappedBy = "part")
    List<PartsInRepair> partsUsed;

    public Parts() {}

    public Parts(String catalogNumber, int amount, int price, String partName) {
        this.catalogNumber = catalogNumber;
        this.amount = amount;
        this.price = price;
        this.partName = partName;
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
