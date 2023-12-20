package com.opensourcedev.backend;

import com.opensourcedev.backend.controller.MainController;
import com.opensourcedev.backend.model.Rental;
import com.opensourcedev.backend.service.MainService;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
class MainTest {

    @Mock
    private MainService mainService;

    @InjectMocks
    private MainController mainController;

    @Test
    void testGetRentalHistory() {
        String username = "test_user";
        List<Rental> mockRentalHistory = Arrays.asList(
            new Rental(10,27, 987654321, new Date(1640007900000L), 0, 9, "Returned", 2),
            new Rental(11,27, 567892341, new Date(1639926060000L), 1, 18, "Returned", 2)
        );
        when(mainService.getRentalHistory(username)).thenReturn(mockRentalHistory);

        List<Rental> result = mainController.getRentalHistory(username);

        assertEquals(mockRentalHistory.size(), result.size());
        for (int i = 0; i < mockRentalHistory.size(); i++) {
            Rental expectedRental = mockRentalHistory.get(i);
            Rental actualRental = result.get(i);
            assertEquals(expectedRental.getRentalId(), actualRental.getRentalId());
            assertEquals(expectedRental.getUserId(), actualRental.getUserId());
            assertEquals(expectedRental.getTransactionId(), actualRental.getTransactionId());
            assertEquals(expectedRental.getRentalDate(), actualRental.getRentalDate());
            assertEquals(expectedRental.getDuration(), actualRental.getDuration());
            assertEquals(expectedRental.getCharges(), actualRental.getCharges());
            assertEquals(expectedRental.getRentalStatus(), actualRental.getRentalStatus());
            assertEquals(expectedRental.getChargingStationId(), actualRental.getChargingStationId());
        }
    }
}
