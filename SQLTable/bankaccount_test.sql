-- Simplified payment account table (no card number)
CREATE TABLE bankaccount (
    id SERIAL PRIMARY KEY,
    studentid INT REFERENCES student(studentid) ON DELETE CASCADE,
    balance DECIMAL(10,2) DEFAULT 0,
    amountdue DECIMAL(10,2) DEFAULT 0,
    payment_option VARCHAR(50) DEFAULT 'Credit Card'
);