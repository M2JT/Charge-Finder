package com.opensourcedev.backend.controller;

import com.opensourcedev.backend.model.Rental;
import com.opensourcedev.backend.service.RentalService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rental")
@CrossOrigin(origins = "http://localhost:3000")
public class RentalController {
  private final RentalService rentalService;

  @Autowired
  public RentalController(RentalService rentalService) {
    this.rentalService = rentalService;
  }

  @GetMapping("/getRentalHistory")
  public @ResponseBody List<Rental> getRentalHistory() {
    return rentalService.getRentalHistory();
  }

  @PostMapping("/return/{rentalId}")
  public String returnCharger(@PathVariable Long rentalId) {

    return "Rental returned successfully";
  }
}

