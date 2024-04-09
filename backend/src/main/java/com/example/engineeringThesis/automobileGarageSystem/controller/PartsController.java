package com.example.engineeringThesis.automobileGarageSystem.controller;

import com.example.engineeringThesis.automobileGarageSystem.dto.PartsDTO;
import com.example.engineeringThesis.automobileGarageSystem.service.parts.PartsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parts")
public class PartsController {

    private final PartsService partsService;

    @Autowired
    public PartsController(PartsService partsService) {
        this.partsService = partsService;
    }

    @GetMapping("/{id}")
    public PartsDTO getPartById(@PathVariable Integer id) {
        return partsService.getPartById(id);
    }

    @PostMapping()
    public PartsDTO addPart(@RequestBody PartsDTO partsDTO) {
        return partsService.addNewPart(partsDTO);
    }

    @PutMapping()
    public PartsDTO updatePart(@RequestBody PartsDTO partsDTO) {
        return partsService.updatePart(partsDTO);
    }

    @DeleteMapping("/{id}")
    public String deletePartById(@PathVariable Integer id) {
        return partsService.deletePartById(id);
    }
}
