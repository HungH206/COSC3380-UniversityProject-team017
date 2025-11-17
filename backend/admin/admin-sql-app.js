// admin-app.js

const sqlLog = document.getElementById("sql-log");
const results = document.getElementById("results");

document.getElementById("btn-setup").onclick = async () => {
  sqlLog.textContent = "Running full DB setup…";

  // load init SQL from your actual db.js file
  const response = await fetch("/api/setup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sql: `
        -- Insert your full initSchema() SQL here
        SELECT NOW(); 
      `
    }),
  });

  const data = await response.json();
  results.textContent = JSON.stringify(data, null, 2);
};

document.getElementById("btn-run-sql").onclick = async () => {
  const sql = document.getElementById("sql-input").value;

  sqlLog.textContent = sql;

  const response = await fetch("/api/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sql }),
  });

  const data = await response.json();
  results.textContent = JSON.stringify(data, null, 2);
};
