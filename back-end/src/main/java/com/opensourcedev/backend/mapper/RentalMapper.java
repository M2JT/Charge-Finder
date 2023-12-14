package com.opensourcedev.backend.mapper;

import com.opensourcedev.backend.model.Rental;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RentalMapper {
  List<Rental> getRentalHistory(Integer userId);
  boolean returnCharger(Map<String, Object> paramMap);
  boolean returnChargerStation(Integer chargingStationId);
  Rental getRentalByID(Integer rentalId);
}
