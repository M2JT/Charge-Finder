package com.opensourcedev.backend.controller;

import com.opensourcedev.backend.model.ChargingStation;
import com.opensourcedev.backend.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/hello")
    public String returnHello() {
        return "hello!";
    }
}
