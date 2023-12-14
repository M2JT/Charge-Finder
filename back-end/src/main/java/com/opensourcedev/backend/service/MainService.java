package com.opensourcedev.backend.service;

import com.opensourcedev.backend.model.ChargingStation;

import java.util.List;

public interface MainService {
    List<ChargingStation> getAllStationsInfo();
}
