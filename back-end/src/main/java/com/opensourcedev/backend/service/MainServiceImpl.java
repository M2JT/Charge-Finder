package com.opensourcedev.backend.service;

import com.opensourcedev.backend.dto.LoginResponse;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MainServiceImpl implements MainService {

    @Autowired
    private StationMapper stationMapper;

    @Autowired
    private RentalMapper rentalMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
        String message = "Registration succeed!";

        try {
            List<User> existingUsers = userMapper.checkDuplicateRegistration(user.getUsername(), user.getEmail());
            if (existingUsers.isEmpty()) {
                if (user.getJoinDate() == null) {
                    user.setJoinDate(new Date());
                }
                user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
                userMapper.addNewUser(user);
                isRegistered = true;
            } else {
                message = "Error: duplicate username or email address";
            }
        } catch (Exception e) {
            System.out.println("Error registering new user: " + e.getMessage());
            e.printStackTrace();
        }

        if (isRegistered) {
            String token = JwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(
                    new LoginResponse(
                            message,
                            user.getUsername(),
                            user.getEmail(),
                            user.getJoinDate(),
                            token
                    )
            );
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new LoginResponse(message, null, null, null, null));
        }
    }

    @Override
    public boolean authenticateUser(String email, String password) {
        try {
            User existingUser = userMapper.getUserByEmail(email);
            if (existingUser == null) {
                return false;
            } else {
                return passwordEncoder.matches(password, existingUser.getUserPassword());
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
            User existingUser = userMapper.getUserByEmail(user.getEmail());
            String token = JwtUtil.generateToken(existingUser.getUsername());

            return ResponseEntity.ok(
                    new LoginResponse(
                            "Welcome to Charge Finder!",
                            existingUser.getUsername(),
                            existingUser.getEmail(),
                            existingUser.getJoinDate(),
                            token
                    )
            );
        }

        return ResponseEntity
                .badRequest()
                .body(new LoginResponse("Invalid credentials", null, null, null, null));
    }
}
