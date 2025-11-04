DROP TABLE IF EXISTS Transactions;
CREATE TABLE Transactions (
  TransactionID SERIAL PRIMARY KEY,
  StudentID CHAR(10) REFERENCES BankAccount(StudentID),
  TotalAmount DECIMAL(10,2),
  PaymentMethod VARCHAR(50),
  Status VARCHAR(20),
  TransactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

