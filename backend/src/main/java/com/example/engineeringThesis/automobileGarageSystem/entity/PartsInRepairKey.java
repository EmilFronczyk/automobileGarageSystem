package com.example.engineeringThesis.automobileGarageSystem.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PartsInRepairKey implements Serializable {
    @Column(name = "id_naprawy")
    private int repairId;

    @Column(name = "id_czesci")
    private int partId;

    public PartsInRepairKey() {
    }

    public PartsInRepairKey(int repairId, int partId) {
        this.repairId = repairId;
        this.partId = partId;
    }

    public int getRepairId() {
        return repairId;
    }

    public void setRepairId(int repairId) {
        this.repairId = repairId;
    }

    public int getPartId() {
        return partId;
    }

    public void setPartId(int partId) {
        this.partId = partId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PartsInRepairKey that = (PartsInRepairKey) o;
        return repairId == that.repairId && partId == that.partId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(repairId, partId);
    }
}
