package com.opensourcedev.backend.mapper;

import com.opensourcedev.backend.model.ChargingStation;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StationMapper {
    List<ChargingStation> getAllStationsInfo();

    ChargingStation getSingleStationInfo(Integer chargingStationId);

    void decrementPowerBankCount(Integer chargingStationId);
}
