package com.example.engineeringThesis.automobileGarageSystem.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class PartsInRepairKey implements Serializable {
    @Column(name = "id_naprawy")
    private Integer repairId;

    @Column(name = "id_czesci")
    private Integer partId;

    public PartsInRepairKey() {
    }

    public PartsInRepairKey(Integer repairId, Integer partId) {
        this.repairId = repairId;
        this.partId = partId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PartsInRepairKey)) return false;
        PartsInRepairKey that = (PartsInRepairKey) o;
        return Objects.equals(getPartId(), that.getPartId()) && Objects.equals(getRepairId(), that.repairId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRepairId(), getPartId());
    }
}
