-- Simplified payment account table (no card number)
DROP TABLE IF EXISTS bankaccount CASCADE;
CREATE TABLE bankaccount (
    id SERIAL PRIMARY KEY,
    studentid INT REFERENCES student(studentid) ON DELETE CASCADE,
    balance DECIMAL(10,2) DEFAULT 0,
    amountdue DECIMAL(10,2) DEFAULT 0,
    payment_option VARCHAR(50) DEFAULT 'Credit Card'
);

INSERT INTO bankaccount (studentid, balance, amountdue, payment_option)
VALUES
(1, 10000.00, 0.00, 'Credit Card');