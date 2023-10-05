package com.opensourcedev.javatemplateproject;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class DemoTest {

    @Test
    void demoTest() {
        assertEquals(4, 2 + 2, "2 + 2 should = 4");
    }

}
