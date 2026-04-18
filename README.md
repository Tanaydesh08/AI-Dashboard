# ☕ DataSage AI — AI Data Analyst Dashboard

## 🚀 Overview

DataSage AI is an AI-powered backend system that enables users to upload CSV files, query data using natural language, and receive analytical insights.

This project combines **Java (Spring Boot)** with **AI capabilities** to simulate a real-world data analytics dashboard.

---

## 🎯 Aim of the Project

To build an AI-powered system where users can:

* Upload CSV files 📂
* Ask questions in natural language 🤖
* Get insights using backend data processing 📊

---

## 🧠 Project Workflow


Upload CSV → Parse Data → Store in Memory
        ↓
User Query (Manual / AI)
        ↓
AI → Convert to JSON (groupBy, metric, operation)
        ↓
Java Processing Engine
        ↓
Final Result (Aggregated Data)


---

## 🛠️ Tech Stack

### Backend

* Java
* Spring Boot
* Spring Web

### Data Handling

* Apache Commons CSV
* Jackson (JSON parsing)

### AI Integration

* OpenAI API (REST)
* Fallback AI logic (for reliability)

---

## 🔗 API Endpoints

### 📂 Upload CSV

http
POST /api/upload

### 📊 Get Data

http
GET /api/data

### ⚙️ Manual Query

http
POST /api/query

### 🤖 AI Query

http
POST /api/ai/query

---

## 🧪 Sample Requests

### Manual Query

json
{
  "groupBy": "department",
  "metric": "salary",
  "operation": "sum"
}


### AI Query

json
"Show total salary by department"


---

## 📸 Screenshots

### 🔹 CSV Upload API

### 🔹 Data Retrieval

### 🔹 AI Query
<img width="1642" height="858" alt="Screenshot 2026-04-18 172709" src="https://github.com/user-attachments/assets/93e88fc0-df18-41ce-8305-f7774b1e87d0" />


### 🔹 Manual Query
<img width="1094" height="594" alt="Screenshot 2026-04-18 173236" src="https://github.com/user-attachments/assets/e99d3496-296b-4230-82b1-d26b243ef143" />
<img width="1097" height="626" alt="Screenshot 2026-04-18 173226" src="https://github.com/user-attachments/assets/594e2213-ff80-43f8-a7b2-ad593cfc4df2" />
<img width="1096" height="572" alt="Screenshot 2026-04-18 173208" src="https://github.com/user-attachments/assets/289080c7-2c2f-4723-be6d-e8588f54d76a" />


---

## 🧠 Code Explanation

---

### 🔹 1. AI Service (AiService.java)

<img width="830" height="801" alt="AiService" src="https://github.com/user-attachments/assets/8c6dc12b-a1b5-4b5a-9502-e53224ef201a" />
<img width="946" height="808" alt="AiService-2" src="https://github.com/user-attachments/assets/0bf45f96-e95d-4fe5-bc72-332959c4d376" />


Handles AI integration and query conversion.

#### Responsibilities:

* Calls OpenAI API using WebClient
* Converts natural language → structured JSON
* Provides fallback logic if API fails

#### Key Methods:

* callOpenAI() → Sends request to OpenAI API
* generateQuery() → Uses API or fallback logic

---

### 🔹 2. CSV Service (CsvService.java)

<img width="882" height="607" alt="CsvService" src="https://github.com/user-attachments/assets/a8c0f9c4-d95a-40f5-b1f2-091ff03dfe06" />
<img width="893" height="552" alt="CsvService-2" src="https://github.com/user-attachments/assets/493d67cb-9160-427c-beb5-7cee4585240f" />


Core data processing engine.

#### Responsibilities:

* Parse CSV file
* Store data in memory
* Perform analytics (SUM, AVG)

#### Key Methods:

* parseAndStore() → Reads CSV and stores data
* process() → Groups & aggregates data

---

### 🔹 3. File Controller (FileController.java)

<img width="933" height="503" alt="FileController" src="https://github.com/user-attachments/assets/b66db3d9-57eb-4c78-9281-fe97ec263502" />

Handles main backend APIs.

#### Endpoints:

* POST /api/upload → Upload CSV
* GET /api/data → Get stored data
* POST /api/query → Manual query
* GET /api/test → Backend Testing

---

### 🔹 4. AI Controller (AiController.java)

<img width="767" height="394" alt="AiController" src="https://github.com/user-attachments/assets/7cd13a79-398e-48ba-97b6-197f6488e852" />

Connects AI with backend processing.

#### Workflow:

1. Receives natural language input
2. Calls AI service
3. Converts response → QueryRequest
4. Sends to processing engine
5. Returns result

#### Endpoint:

* POST /api/ai/query

 <img width="1441" height="176" alt="Screenshot 2026-04-18 173435" src="https://github.com/user-attachments/assets/49a7012c-1dd4-46ff-950f-1f641e88afa6" />


---

## 🔄 Complete Flow


User Input (Natural Language)
        ↓
AI Service (OpenAI / Fallback)
        ↓
Structured JSON (QueryRequest)
        ↓
CsvService (Processing Engine)
        ↓
Final Result (Aggregated Data)

---

## ⚠️ Note on AI Integration

The system is designed to integrate with OpenAI API.
Due to API billing constraints, a fallback AI logic is implemented to ensure uninterrupted functionality during demo and testing.

---

## 🚀 Future Enhancements

* React frontend dashboard
* Charts & data visualization
* Full OpenAI integration (live)
* Deployment (Render / Vercel)

---

## 🏁 Conclusion

This project demonstrates how **Java backend systems can be combined with AI** to build intelligent analytics platforms.

It showcases:

* Real-world backend architecture
* Data processing pipelines
* AI integration layer

---

## 👨‍💻 Author

Tanay Deshmukh
