package com.opensourcedev.backend.service;

import com.opensourcedev.backend.dto.LoginResponse;
import com.opensourcedev.backend.dto.MessageResponse;
import com.opensourcedev.backend.dto.RentalDetail;
import com.opensourcedev.backend.mapper.RentalMapper;
import com.opensourcedev.backend.mapper.StationMapper;
import com.opensourcedev.backend.mapper.UserMapper;
import com.opensourcedev.backend.model.ChargingStation;
import com.opensourcedev.backend.model.Rental;
import com.opensourcedev.backend.model.User;
import com.opensourcedev.backend.utils.JwtUtil;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MainServiceImpl implements MainService {

  @Autowired
  StationMapper stationMapper;

  @Autowired
  RentalMapper rentalMapper;

  @Autowired
  UserMapper userMapper;

  @Override
  public List<ChargingStation> getAllStationsInfo() {
    return stationMapper.getAllStationsInfo();
  }

  @Override
  public List<Rental> getRentalHistory(String username) {
    return rentalMapper.getRentalHistory(userMapper.getUserIDByName(username));
  }

  @Override
  public boolean returnPowerBank(Integer rentalId) {
    Rental rentalToReturn = rentalMapper.getRentalByID(rentalId);
    Date startTime = rentalToReturn.getRentalDate();
    long durationInMillis = new Date().getTime() - startTime.getTime();
    int hoursBetween = (int) TimeUnit.MILLISECONDS.toHours(durationInMillis);

    Integer chargesPerHour = rentalToReturn.getCharges();
    Integer endPrice = chargesPerHour;
    for (int i = 1; i < hoursBetween; i++) {
      endPrice += chargesPerHour;
    }

    Map<String, Object> paramMap = new HashMap<>();
    paramMap.put("rentalId", rentalId);
    paramMap.put("charges", endPrice);
    paramMap.put("duration", hoursBetween);
    return (
      rentalMapper.returnPowerBank(paramMap) &&
      rentalMapper.returnChargerStation(rentalToReturn.getChargingStationId())
    );
  }

  @Override
  public boolean rentPowerBank(RentalDetail rentalDetail) {
    try {
      int availablePowerBanks = stationMapper
        .getSingleStationInfo(rentalDetail.getChargingStationId())
        .getAvailablePowerBanks();
      if (availablePowerBanks <= 0) {
        return false;
      } else {
        int userId = userMapper.getUserIDByName(rentalDetail.getUsername());
        rentalMapper.rentPowerBank(rentalDetail, userId);
        stationMapper.decrementPowerBankCount(
          rentalDetail.getChargingStationId()
        );
        return true;
      }
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return false;
    }
  }

  @Override
  public ResponseEntity<LoginResponse> registerUser(User user) {
    boolean isRegistered = false;
    try {
      if (user.getJoinDate() == null) {
        user.setJoinDate(new Date());
      }
      userMapper.addUser(user);
      isRegistered = true;
    } catch (Exception e) {
      System.out.println("Error registering user: " + e.getMessage());
      e.printStackTrace();
    }
    if (isRegistered) {
      String token = JwtUtil.generateToken(user.getUsername());
      return ResponseEntity.ok(
        new LoginResponse(
          "User registered successfully",
          user.getUsername(),
          user.getEmail(),
          user.getJoinDate(),
          token
        )
      );
    } else {
      return ResponseEntity
        .badRequest()
        .body(new LoginResponse("Registration failed", null, null, null, null));
    }
  }

  @Override
  public boolean authenticateUser(String email, String password) {
    try {
      User user = userMapper.getUserByEmail(email);
      System.out.println("Fetched user: " + user);
      System.out.println(
        "Password from DB: " + (user != null ? user.getUserPassword() : "null")
      );
      System.out.println("Password from input: " + password); // Log the input password
      if (
        user != null &&
        user.getUserPassword() != null &&
        user.getUserPassword().equals(password)
      ) {
        return true;
      }
    } catch (Exception e) {
      System.out.println("Error during authentication: " + e.getMessage());
      e.printStackTrace();
    }
    return false;
  }

  @Override
  public ResponseEntity<LoginResponse> loginUser(User user) {
    if (authenticateUser(user.getEmail(), user.getUserPassword())) {
      User userByEmail = userMapper.getUserByEmail(user.getEmail());
      String token = JwtUtil.generateToken(userByEmail.getUsername());

      return ResponseEntity.ok(
        new LoginResponse(
          "Login Successful!",
          userByEmail.getUsername(),
          user.getEmail(),
          userByEmail.getJoinDate(),
          token
        )
      );
    }
    return ResponseEntity
      .badRequest()
      .body(new LoginResponse("Invalid credentials", null, null, null, null));
  }
}
