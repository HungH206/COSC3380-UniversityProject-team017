CREATE TABLE Transaction (
  TransactionID SERIAL PRIMARY KEY,
  StudentID CHAR(10) REFERENCES Student(StudentID),
  Amount DECIMAL(10,2),
  PaymentMethod VARCHAR(50),
  Status VARCHAR(20) DEFAULT 'Completed',
  TransactionDate TIMESTAMP DEFAULT NOW()
);