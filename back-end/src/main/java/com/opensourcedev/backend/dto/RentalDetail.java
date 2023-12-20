package com.opensourcedev.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RentalDetail {
    private String username;
    private Integer transactionId;
    private Date rentedOnDate;
    private Integer duration;
    private Integer chargesPerHour;
    private String rentalStatus;
    private Integer chargingStationId;
}
