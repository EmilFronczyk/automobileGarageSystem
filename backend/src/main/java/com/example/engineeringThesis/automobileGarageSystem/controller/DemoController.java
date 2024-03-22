package com.example.engineeringThesis.automobileGarageSystem.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @GetMapping("/firstApiTest")
    public String firstApiTest() {
        return "This is first api test";
    }
}
