package com.opensourcedev.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChargingStation {
    private Integer stationId;
    private String stationName;
    private Double latitude;
    private Double longitude;
    private Integer availablePowerBanks;
    private Integer price;
}
