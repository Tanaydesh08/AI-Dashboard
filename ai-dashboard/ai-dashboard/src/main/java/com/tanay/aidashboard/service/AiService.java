package com.tanay.aidashboard.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;


@Service
public class AiService {
    @Value("${openai.api.key}")
    private String apikey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://api.openai.com/v1")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();
    public String generateQuery(String userInput){
        String prompt = """
                Convert this user query into JSON with:
                groupBy, metric, operation
                
                Example:
                Input: total salary by department
                Output:
                {
                    "groupBy" : "department",
                    "metric" : "salary",
                    "operation" : "sum"
                }
                User Input : %s
                """.formatted(userInput);
        Map<String, Object> requestBody = Map.of("model", "gpt-4.1-mini", "message", prompt);

        System.out.println("API KEY : " + apikey);
        return webClient.post()
                .uri("/responses")
                .header(HttpHeaders.AUTHORIZATION, "Bearer" + apikey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}