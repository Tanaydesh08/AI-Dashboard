package com.tanay.aidashboard.controller;

import com.tanay.aidashboard.dto.QueryRequest;
import com.tanay.aidashboard.dto.UploadResponse;
import com.tanay.aidashboard.service.CsvService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FileController {
    private final CsvService csvService;

    @PostMapping("/upload")
    public UploadResponse uploadfile(@RequestParam("file")MultipartFile file){
        int count = csvService.parseAndStore(file);
        return new UploadResponse("File uploaded successfully", count);
    }
    @GetMapping("/data")
    public Object getData(){
        return csvService.getData();
    }

    @PostMapping("/query")
    public Object queryData(@RequestBody QueryRequest request){
        return csvService.process(request);
    }

    @GetMapping("/test")
    public String test(){
        return "DataSage AI Backend running";
    }
}