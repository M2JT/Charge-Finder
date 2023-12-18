package com.opensourcedev.backend.service;

import com.opensourcedev.backend.dto.LoginResponse;
import com.opensourcedev.backend.dto.RentalDetail;
import com.opensourcedev.backend.model.ChargingStation;

import com.opensourcedev.backend.model.Rental;

import com.opensourcedev.backend.model.User;

import java.util.List;

import org.springframework.http.ResponseEntity;

public interface MainService {
    List<ChargingStation> getAllStationsInfo();

    List<Rental> getRentalHistory(String username);

    boolean returnCharger(Integer rentalId);

    boolean rentPowerBank(RentalDetail rentalDetail);

    ResponseEntity<LoginResponse> registerUser(User user);

    boolean authenticateUser(String email, String password);

    ResponseEntity<LoginResponse> loginUser(User user);

}
