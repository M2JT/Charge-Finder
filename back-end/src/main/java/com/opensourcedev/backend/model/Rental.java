package com.opensourcedev.backend.model;

import java.util.Date;


public class Rental {

  private Long id;

  private Long userId;


  private Long transactionId;


  private Date date;


  private int duration;


  private int charges;


  private String rentalStatus;


  public Rental() {}

  public Rental(Long userId, Long transactionId, Date date,
      int duration, int charges, String rentalStatus) {
    this.userId = userId;
    this.transactionId = transactionId;
    this.date = date;
    this.duration = duration;
    this.charges = charges;
    this.rentalStatus = rentalStatus;
  }


  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public Long getTransactionId() {
    return transactionId;
  }

  public void setTransactionId(Long transactionId) {
    this.transactionId = transactionId;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public int getDuration() {
    return duration;
  }

  public void setDuration(int duration) {
    this.duration = duration;
  }

  public int getCharges() {
    return charges;
  }

  public void setCharges(int charges) {
    this.charges = charges;
  }

  public String getRentalStatus() {
    return rentalStatus;
  }

  public void setRentalStatus(String rentalStatus) {
    this.rentalStatus = rentalStatus;
  }
}