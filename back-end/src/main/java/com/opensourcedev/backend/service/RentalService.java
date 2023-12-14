package com.opensourcedev.backend.service;

import com.opensourcedev.backend.repository.RentalRepository;
import com.opensourcedev.backend.model.Rental;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RentalService {
  private final RentalRepository rentalRepository;

  @Autowired
  public RentalService(RentalRepository rentalRepository) {
    this.rentalRepository = rentalRepository;
  }

  public List<Rental> getRentalHistory() {
    return rentalRepository.findAll();
  }

  public boolean returnCharger(Long rentalId) {
    return rentalRepository.returnCharger(rentalId);
  }
}
