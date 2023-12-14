package com.opensourcedev.backend.model;

import lombok.Data;

@Data
public class ChargingStation {
    private Integer stationId;
    private String stationName;
    private Double latitude;
    private Double longitude;
    private Integer availablePowerBanks;
    private Integer price;
}
