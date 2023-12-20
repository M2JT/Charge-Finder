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
    private Date updateTime;
}