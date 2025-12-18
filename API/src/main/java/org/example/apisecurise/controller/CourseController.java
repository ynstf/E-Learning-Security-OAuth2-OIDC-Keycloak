package org.example.apisecurise.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/api/learning")
public class CourseController {

    private final List<Map> learningItems = new ArrayList<>();
    private final AtomicInteger idCounter = new AtomicInteger(1);

    public CourseController() {
        // Initialize with demo data
        Map item1 = new HashMap<>();
        item1.put("id", String.valueOf(idCounter.getAndIncrement()));
        item1.put("title", "Spring Boot Fundamentals");
        learningItems.add(item1);

        Map item2 = new HashMap<>();
        item2.put("id", String.valueOf(idCounter.getAndIncrement()));
        item2.put("title", "React Development Guide");
        learningItems.add(item2);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<List<Map>> getAllCourses() {
        return ResponseEntity.ok(learningItems);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map> createCourse(@RequestBody Map courseData) {
        Map newItem = new HashMap<>();
        newItem.put("id", String.valueOf(idCounter.getAndIncrement()));
        newItem.put("title", courseData.getOrDefault("title", "Untitled Course"));
        learningItems.add(newItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(newItem);
    }
}