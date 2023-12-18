package com.opensourcedev.backend.service;

import com.opensourcedev.backend.dto.RentalDetail;
import com.opensourcedev.backend.model.ChargingStation;

import com.opensourcedev.backend.model.Rental;

import com.opensourcedev.backend.model.User;

import java.util.List;

public interface MainService {
    List<ChargingStation> getAllStationsInfo();

    List<Rental> getRentalHistory(String username);

    boolean returnCharger(Integer rentalId);

    boolean rentPowerBank(RentalDetail rentalDetail);

    boolean registerUser(User user);

    boolean authenticateUser(String email, String password);

}
