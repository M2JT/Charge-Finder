package com.opensourcedev.backend.controller;

import com.opensourcedev.backend.dto.RentalDetail;
import com.opensourcedev.backend.model.ChargingStation;
import com.opensourcedev.backend.model.Rental;
import com.opensourcedev.backend.service.MainService;
import com.opensourcedev.backend.dto.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.opensourcedev.backend.model.User;
import org.springframework.http.ResponseEntity;


import java.util.List;

@RestController
@RequestMapping(value = "/", produces = "application/json")
public class MainController {

    @Autowired
    MainService mainService;

    @GetMapping("/getAllStations")
    public List<ChargingStation> getAllStations() {
        return mainService.getAllStationsInfo();
    }

    @PostMapping("/rent")
    public String rentPowerBank(@RequestBody RentalDetail rentalDetail) {
        return mainService.rentPowerBank(rentalDetail) ? "rent successful!" : "rent failed!";
    }

    @GetMapping("/getRentalHistory/{username}")
    public List<Rental> getRentalHistory(@PathVariable String username) {
        return mainService.getRentalHistory(username);
    }

    @PostMapping("/return/{rentalId}")
    public String returnCharger(@PathVariable Integer rentalId) {
        return (mainService.returnCharger(rentalId)) ? "Rental returned successfully" : "Error, rental couldn't be returned.";
    }

       @PostMapping("/register")
public ResponseEntity<MessageResponse> registerUser(@RequestBody User user) {
    // Detailed logging of the received user object
    System.out.println("Registering user: " + user.getUsername() + ", " + user.getEmail() + ", " + user.getUserPassword() + ", " + user.getJoinDate());

boolean isRegistered = mainService.registerUser(user);
    if (isRegistered) {
        return ResponseEntity.ok(new MessageResponse("User registered successfully"));
    } else {
        return ResponseEntity.badRequest().body(new MessageResponse("Registration failed"));
    }
}
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        boolean isAuthenticated = mainService.authenticateUser(user.getEmail(), user.getUserPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }
}
