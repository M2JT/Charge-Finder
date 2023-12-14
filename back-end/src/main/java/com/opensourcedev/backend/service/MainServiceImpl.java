package com.opensourcedev.backend.service;

import com.opensourcedev.backend.mapper.StationMapper;
import com.opensourcedev.backend.model.ChargingStation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainServiceImpl implements MainService {

    @Autowired
    StationMapper stationMapper;

    @Override
    public List<ChargingStation> getAllStationsInfo() {
        return stationMapper.getAllStationsInfo();
    }
}
