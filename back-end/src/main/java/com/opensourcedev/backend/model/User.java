package com.opensourcedev.backend.model;

import lombok.Data;

import java.util.Date;

@Data
public class User {
    private Integer userId;
    private String username;
    private String email;
    private String userPassword;
    private Date joinDate;
}
