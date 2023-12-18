package com.opensourcedev.backend.model;

import java.util.Date;

public class User {
    private Integer userId;
    private String username;
    private String email;
    private String userPassword;
    private Date joinDate;

    // Default constructor
    public User() {}

    // Parameterized constructor
    public User(Integer userId, String username, String email, String userPassword, Date joinDate) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.userPassword = userPassword;
        this.joinDate = joinDate;
    }

    // Getters
    public Integer getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public Date getJoinDate() {
        return joinDate;
    }

    // Setters
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public void setJoinDate(Date joinDate) {
        this.joinDate = joinDate;
    }
}
