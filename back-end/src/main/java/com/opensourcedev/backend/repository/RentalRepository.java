package com.opensourcedev.backend.repository;

import com.opensourcedev.backend.model.Rental;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import org.springframework.stereotype.Repository;

@Repository
public class RentalRepository {
  List<Rental> rentals = new ArrayList<>();
  public List<Rental> findAll(){

    Rental rental = new Rental(1L, 1L, new Date(), 2, 10, "Rented");
    Rental rental2 = new Rental(1L, 1L, Date.from(LocalDateTime.now().minusDays(1).atZone(ZoneId.systemDefault()).toInstant()), 50, 100, "Returned");

    rentals.add(rental);
    rentals.add(rental2);

    return rentals;
  }

  public boolean returnCharger(Long rentalId){
    //Change status, calculate price based on create time update time difference
    //Increase charging station + 1

    for(Rental rental : rentals){
      if(Objects.equals(rental.getId(), rentalId)){
        rental.setRentalStatus("Returned");
        return true;
      }
    }
    return false;
  }
}

