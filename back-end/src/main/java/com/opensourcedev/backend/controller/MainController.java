package com.opensourcedev.backend.controller;

import com.opensourcedev.backend.model.ChargingStation;
import com.opensourcedev.backend.model.Rental;
import com.opensourcedev.backend.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/", produces = "application/json")
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {

    @Autowired
    MainService mainService;

    @GetMapping("/getAllStations")
    public List<ChargingStation> getAllStations() {
        return mainService.getAllStationsInfo();
    }

    @GetMapping("/getRentalHistory/{username}")
    public @ResponseBody List<Rental> getRentalHistory(@PathVariable String username){
        return mainService.getRentalHistory(username);
    }

    @PostMapping("/return/{rentalId}")
    public String returnCharger(@PathVariable Integer rentalId) {
        return (mainService.returnCharger(rentalId)) ? "Rental returned successfully" : "Error, rental couldn't be returned.";
    }
}
