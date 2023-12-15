package com.opensourcedev.backend.controller;

import com.opensourcedev.backend.dto.RentalDetail;
import com.opensourcedev.backend.model.ChargingStation;
import com.opensourcedev.backend.model.Rental;
import com.opensourcedev.backend.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
