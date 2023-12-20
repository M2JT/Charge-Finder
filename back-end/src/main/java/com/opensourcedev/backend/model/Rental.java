package com.opensourcedev.backend.model;

import java.util.Date;

import lombok.Data;

@Data
public class Rental {
    private Integer rentalId;
    private Integer userId;
    private Integer transactionId;
    private Date rentalDate;
    private Integer duration;
    private Integer charges;
    private String rentalStatus;
    private Integer chargingStationId;


    public Rental(Integer rentalId, Integer userId, Integer transactionId, Date rentalDate,
        Integer duration, Integer charges, String rentalStatus, Integer chargingStationId) {
        this.rentalId = rentalId;
        this.userId = userId;
        this.transactionId = transactionId;
        this.rentalDate = rentalDate;
        this.duration = duration;
        this.charges = charges;
        this.rentalStatus = rentalStatus;
        this.chargingStationId = chargingStationId;
    }
}