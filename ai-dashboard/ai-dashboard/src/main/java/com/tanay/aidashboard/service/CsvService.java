package com.tanay.aidashboard.service;

import com.tanay.aidashboard.dto.QueryRequest;
import org.apache.commons.csv.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.*;

@Service
public class CsvService {

    private List<Map<String, String>> dataset = new ArrayList<>();

    public int parseAndStore(MultipartFile file) {
        try (Reader reader = new InputStreamReader(file.getInputStream());
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {

            dataset.clear();

            for (CSVRecord record : csvParser) {
                Map<String, String> row = new HashMap<>();
                for (String header : csvParser.getHeaderMap().keySet()) {
                    row.put(header, record.get(header));
                }
                dataset.add(row);
            }

            return dataset.size();

        } catch (IOException e) {
            throw new RuntimeException("Error processing CSV file");
        }
    }
    public Map<String, Double> process(QueryRequest request){
        Map<String, List<Double>> groupedData = new HashMap<>();
        for(Map<String, String> row : dataset){
            String groupKey = row.get(request.getGroupBy());
            double value = Double.parseDouble(row.get(request.getMetric()));

            groupedData
                    .computeIfAbsent(groupKey, k -> new ArrayList<>())
                    .add(value);
        }
        Map<String, Double> result = new HashMap<>();
        for(String key : groupedData.keySet()){
            List<Double> values = groupedData.get(key);

            if("sum".equalsIgnoreCase(request.getOperation())) {
                result.put(key, values.stream().mapToDouble(Double::doubleValue).sum());
            } else if ("avg".equalsIgnoreCase(request.getOperation())) {
                result.put(key, values.stream().mapToDouble(Double::doubleValue).average().orElse(0));
            }
        }
        return result;
    }
    public List<Map<String, String>> getData() {
        return dataset;
    }
}