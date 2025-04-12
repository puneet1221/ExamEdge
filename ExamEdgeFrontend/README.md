---prompt
create similar list of 6 quizzes for dbms having cateoryId=87



--see the category id from db
--->http://localhost:8080/login-->to get jwt bearer token
http://localhost:8080/quiz/createAllQuiz?id=86
[
  {
    "title": "Microservices Architecture",
    "description": "Quiz on microservices architecture, communication patterns, and best practices",
    "marks": "5",
    "noOfQuestions": "5",
    "isActive": true,
    "duration": "10",
    "categoryId": "86",
    "questions": [
      {
        "content": "Which of the following best defines a microservice?",
        "options": [
          { "text": "A small, independently deployable service that focuses on a specific functionality", "isCorrect": true },
          { "text": "A large monolithic service", "isCorrect": false },
          { "text": "A database optimization technique", "isCorrect": false },
          { "text": "A caching strategy", "isCorrect": false }
        ]
      },
      {
        "content": "What is a common communication protocol for microservices?",
        "options": [
          { "text": "REST", "isCorrect": true },
          { "text": "FTP", "isCorrect": false },
          { "text": "POP3", "isCorrect": false },
          { "text": "SMTP", "isCorrect": false }
        ]
      },
      {
        "content": "Which design pattern is commonly used for handling service discovery in microservices?",
        "options": [
          { "text": "Service Registry", "isCorrect": true },
          { "text": "Observer Pattern", "isCorrect": false },
          { "text": "Strategy Pattern", "isCorrect": false },
          { "text": "Singleton Pattern", "isCorrect": false }
        ]
      },
      {
        "content": "What is a major advantage of microservices over monolithic architecture?",
        "options": [
          { "text": "Independent deployment and scalability", "isCorrect": true },
          { "text": "Lower resource consumption", "isCorrect": false },
          { "text": "Simpler debugging", "isCorrect": false },
          { "text": "Faster initial development", "isCorrect": false }
        ]
      },
      {
        "content": "Which tool is often used for service orchestration in a microservices environment?",
        "options": [
          { "text": "Kubernetes", "isCorrect": true },
          { "text": "Apache Kafka", "isCorrect": false },
          { "text": "Nginx", "isCorrect": false },
          { "text": "MongoDB", "isCorrect": false }
        ]
      }
    ]
  },
  {
    "title": "Data Partitioning and Consistency",
    "description": "Quiz on concepts of partitioning strategies, consistency models, and CAP theorem",
    "marks": "5",
    "noOfQuestions": "5",
    "isActive": true,
    "duration": "10",
    "categoryId": "86",
    "questions": [
      {
        "content": "What does the CAP theorem state?",
        "options": [
          { "text": "Consistency, Availability, and Partition Tolerance cannot be fully achieved simultaneously", "isCorrect": true },
          { "text": "Concurrency, Accessibility, and Performance must always be optimized", "isCorrect": false },
          { "text": "Consistency and Partition Tolerance are mutually exclusive", "isCorrect": false },
          { "text": "Caching and Partitioning are interchangeable", "isCorrect": false }
        ]
      },
      {
        "content": "What is vertical partitioning in databases?",
        "options": [
          { "text": "Splitting tables by columns", "isCorrect": true },
          { "text": "Splitting tables by rows", "isCorrect": false },
          { "text": "Splitting tables based on read and write operations", "isCorrect": false },
          { "text": "Splitting based on storage type", "isCorrect": false }
        ]
      },
      {
        "content": "Which consistency model guarantees that all replicas eventually converge to the same state?",
        "options": [
          { "text": "Eventual Consistency", "isCorrect": true },
          { "text": "Strong Consistency", "isCorrect": false },
          { "text": "Weak Consistency", "isCorrect": false },
          { "text": "Monotonic Consistency", "isCorrect": false }
        ]
      },
      {
        "content": "Which partitioning strategy is based on hashing a key to determine the data location?",
        "options": [
          { "text": "Hash-based partitioning", "isCorrect": true },
          { "text": "Range-based partitioning", "isCorrect": false },
          { "text": "Round-robin partitioning", "isCorrect": false },
          { "text": "Geographical partitioning", "isCorrect": false }
        ]
      },
      {
        "content": "Which property does eventual consistency compromise in distributed systems?",
        "options": [
          { "text": "Immediate consistency", "isCorrect": true },
          { "text": "Partition tolerance", "isCorrect": false },
          { "text": "Data redundancy", "isCorrect": false },
          { "text": "Availability", "isCorrect": false }
        ]
      }
    ]
  },
  {
    "title": "Scalability and High Availability",
    "description": "Quiz on scaling techniques and strategies for ensuring high availability",
    "marks": "5",
    "noOfQuestions": "5",
    "isActive": true,
    "duration": "10",
    "categoryId": "86",
    "questions": [
      {
        "content": "What is horizontal scaling?",
        "options": [
          { "text": "Adding more servers to handle traffic", "isCorrect": true },
          { "text": "Upgrading the hardware of an existing server", "isCorrect": false },
          { "text": "Adding more storage to the database", "isCorrect": false },
          { "text": "Improving server caching", "isCorrect": false }
        ]
      },
      {
        "content": "What is a key benefit of high availability in system design?",
        "options": [
          { "text": "Minimized downtime", "isCorrect": true },
          { "text": "Higher memory usage", "isCorrect": false },
          { "text": "Increased latency", "isCorrect": false },
          { "text": "Complex system management", "isCorrect": false }
        ]
      },
      {
        "content": "Which technique is used to automatically provision and deprovision servers based on demand?",
        "options": [
          { "text": "Auto-scaling", "isCorrect": true },
          { "text": "Database replication", "isCorrect": false },
          { "text": "Backup strategy", "isCorrect": false },
          { "text": "DNS load balancing", "isCorrect": false }
        ]
      },
      {
        "content": "What is the purpose of a health check in high availability systems?",
        "options": [
          { "text": "To monitor the status of servers and services", "isCorrect": true },
          { "text": "To encrypt user data", "isCorrect": false },
          { "text": "To store server logs", "isCorrect": false },
          { "text": "To allocate resources dynamically", "isCorrect": false }
        ]
      },
      {
        "content": "Which of the following techniques can help achieve high availability?",
        "options": [
          { "text": "Failover", "isCorrect": true },
          { "text": "Storing data in a single region", "isCorrect": false },
          { "text": "Disabling health checks", "isCorrect": false },
          { "text": "Using a single instance for production", "isCorrect": false }
        ]
      }
    ]
  }
]
