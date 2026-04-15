package com.tanay.aidashboard.controller;

import com.tanay.aidashboard.dto.QueryRequest;
import com.tanay.aidashboard.service.AiService;
import com.tanay.aidashboard.service.CsvService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tools.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {
    private final AiService aiService;
    private final CsvService csvService;
    private final ObjectMapper objectMapper;

    @PostMapping("/query")
    public Object askAI(@RequestBody String userInput) throws Exception{
        String json = aiService.generateQuery(userInput);
        QueryRequest request = objectMapper.readValue(json, QueryRequest.class);

        return csvService.process(request);
    }
}
