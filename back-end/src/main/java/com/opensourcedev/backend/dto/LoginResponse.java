package com.opensourcedev.backend.dto;

import java.util.Date;

public class LoginResponse {

  private String message;
  private String username;
  private String email;
  private Date joinDate;
  private String token;

  public LoginResponse(
    String message,
    String username,
    String email,
    Date joinDate,
    String token
  ) {
    this.message = message;
    this.username = username;
    this.email = email;
    this.joinDate = joinDate;
    this.token = token;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Date getJoinDate() {
    return joinDate;
  }

  public void setJoinDate(Date joinDate) {
    this.joinDate = joinDate;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }
}
