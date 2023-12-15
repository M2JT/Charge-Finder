package com.opensourcedev.backend.dto;

import lombok.Data;

import java.util.Date;

@Data
public class RentalDetail {
    private String username;
    private Integer transactionId;
    private Date rentedOnDate;
    private Integer duration;
    private Integer chargesPerHour;
    private String rentalStatus;
    private Integer chargingStationId;
}
