package com.tanay.aidashboard.dto;

import lombok.Data;

@Data
public class QueryRequest {
    private String groupBy;
    private String metric;
    private String operation; //sum, avg
}
