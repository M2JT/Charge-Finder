package com.opensourcedev.backend.service;

import com.opensourcedev.backend.mapper.RentalMapper;
import com.opensourcedev.backend.mapper.StationMapper;
import com.opensourcedev.backend.mapper.UserMapper;
import com.opensourcedev.backend.model.ChargingStation;
import com.opensourcedev.backend.model.Rental;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
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
        Rental rentalToReturn = rentalMapper.getRentalByID(rentalId);
        Date startTime = rentalToReturn.getRentalDate();
        Integer hoursBetween = calculateHoursBetweenDates(startTime, new Date());


        Integer chargesPerHour = rentalToReturn.getCharges();
        //when someone rented a charger, we charge them at least once the hourly price
        Integer endPrice = chargesPerHour;

        for (int i = 1; i < hoursBetween; i++) {
            endPrice += chargesPerHour;
        }

        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("rentalId", rentalId);
        paramMap.put("charges", endPrice);
        paramMap.put("duration", hoursBetween);
        return rentalMapper.returnCharger(paramMap) && rentalMapper.returnChargerStation(rentalToReturn.getChargingStationId());
    }

    private Integer calculateHoursBetweenDates(Date startDate, Date endDate) {
        long durationInMillis = endDate.getTime() - startDate.getTime();
        return (int) TimeUnit.MILLISECONDS.toHours(durationInMillis);
    }
}
