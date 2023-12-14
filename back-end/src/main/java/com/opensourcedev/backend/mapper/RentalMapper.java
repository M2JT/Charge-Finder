package com.opensourcedev.backend.mapper;

import com.opensourcedev.backend.model.Rental;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RentalMapper {
  List<Rental> getRentalHistory(Integer userId);
  boolean returnCharger(Integer rentalId);
}
