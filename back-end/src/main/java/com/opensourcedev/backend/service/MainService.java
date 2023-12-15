package com.opensourcedev.backend.service;

import com.opensourcedev.backend.dto.RentalDetail;
import com.opensourcedev.backend.model.ChargingStation;

import com.opensourcedev.backend.model.Rental;

import java.util.List;

public interface MainService {
    List<ChargingStation> getAllStationsInfo();

    List<Rental> getRentalHistory(String username);

    boolean returnCharger(Integer rentalId);

    boolean rentPowerBank(RentalDetail rentalDetail);
}
