package com.opensourcedev.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class MainTest {

    @Test
    void demoTest() {
        assertEquals(4, 2 + 2, "2 + 2 should = 4");
    }

}
