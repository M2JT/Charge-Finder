package com.opensourcedev.backend.service;

import com.opensourcedev.backend.mapper.RentalMapper;
import com.opensourcedev.backend.mapper.StationMapper;
import com.opensourcedev.backend.mapper.UserMapper;
import com.opensourcedev.backend.model.ChargingStation;
import com.opensourcedev.backend.model.Rental;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainServiceImpl implements MainService {

    @Autowired
    StationMapper stationMapper;
    @Autowired
    RentalMapper rentalMapper;
    @Autowired
    UserMapper userMapper;

    public List<ChargingStation> getAllStationsInfo() {
        return stationMapper.getAllStationsInfo();
    }

    public List<Rental> getRentalHistory(String username) {
        return rentalMapper.getRentalHistory(userMapper.getUserIDByName(username));
    }

    public boolean returnCharger(Integer rentalId) {
        return rentalMapper.returnCharger(rentalId);
    }
}
