package com.opensourcedev.backend.model;

import java.util.Date;
import lombok.Getter;


public class Rental {
  @Getter
  private Integer rentalId;
  @Getter
  private Integer userId;
  @Getter
  private Integer transactionId;
  @Getter
  private Date rentalDate;
  @Getter
  private Integer duration;
  @Getter
  private Integer charges;
  @Getter
  private String rentalStatus;
  @Getter
  private Integer chargingStationId;
}