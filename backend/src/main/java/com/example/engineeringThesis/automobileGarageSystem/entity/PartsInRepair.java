package com.example.engineeringThesis.automobileGarageSystem.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Napraw_czesci")
@Getter
@Setter
public class PartsInRepair {

    @EmbeddedId
    @Setter(AccessLevel.NONE)
    private PartsInRepairKey id;

    @ManyToOne
    @MapsId("repairId")
    @JoinColumn(name = "id_naprawy")
    Repair repair;

    @ManyToOne
    @MapsId("partId")
    @JoinColumn(name = "id_czesci")
    Parts part;

    @Column(name = "ilosc_uzytych_czesci")
    private int amountOfUsedParts;
}
