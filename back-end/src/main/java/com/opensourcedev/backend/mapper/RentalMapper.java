package com.opensourcedev.backend.mapper;

import com.opensourcedev.backend.dto.RentalDetail;
import com.opensourcedev.backend.model.Rental;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RentalMapper {
    List<Rental> getRentalHistory(Integer userId);

    boolean returnPowerBank(Map<String, Object> paramMap);

    boolean returnChargerStation(Integer chargingStationId);

    Rental getRentalByID(Integer rentalId);

    void rentPowerBank(RentalDetail rentalDetail, Integer userId);
}
