// admin-sql-app.js
// Minimal vanilla JS front-end for the SQL admin GUI

function appendLog(message) {
  const log = document.getElementById("sql-log");
  const line = `[${new Date().toLocaleTimeString()}] ${message}\n`;
  log.textContent += line;
  log.scrollTop = log.scrollHeight;
}

function renderTable(containerId, payload) {
  const container = document.getElementById(containerId);
  if (!payload || !payload.columns) {
    container.innerHTML = "<div class='small'>No rows.</div>";
    return;
  }

  const { columns, rows } = payload;
  if (!rows || rows.length === 0) {
    container.innerHTML = "<div class='small'>No rows.</div>";
    return;
  }

  let html = "<div style='max-height:260px;overflow:auto'><table><thead><tr>";
  for (const col of columns) {
    html += `<th>${col}</th>`;
  }
  html += "</tr></thead><tbody>";
  for (const row of rows) {
    html += "<tr>";
    for (const col of columns) {
      let val = row[col];
      if (val === null || typeof val === "undefined") val = "";
      html += `<td>${String(val)}</td>`;
    }
    html += "</tr>";
  }
  html += "</tbody></table></div>";
  container.innerHTML = html;
}

async function apiJson(path, options = {}, logLabel = "") {
  const opts = {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  const res = await fetch(path, opts);
  const data = await res.json().catch(() => ({}));

  if (data.sql) {
    appendLog(`${logLabel} ${data.sql}`);
  }
  if (data.statements && Array.isArray(data.statements)) {
    data.statements.forEach((st) => appendLog(`${logLabel} ${st}`));
  }

  if (!res.ok) {
    const msg = data.error || `Request failed: ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const statusReset = document.getElementById("status-reset");
  const statusEnrollment = document.getElementById("status-enrollment");
  const statusTable = document.getElementById("status-table");
  const statusReport = document.getElementById("status-report");
  const statusSql = document.getElementById("status-sql");

  const sectionIdInput = document.getElementById("section-id");
  const studentIdsInput = document.getElementById("student-ids");
  const enrollmentResults = document.getElementById("enrollment-results");

  const tableSelect = document.getElementById("table-select");
  const tableResults = document.getElementById("table-results");
  const reportResults = document.getElementById("report-results");

  const sqlInput = document.getElementById("sql-input");
  const sqlResult = document.getElementById("sql-result");

  // Helper to set status text + class
  function setStatus(el, msg, type = "") {
    el.textContent = msg;
    el.classList.remove("ok", "err");
    if (type === "ok") el.classList.add("ok");
    if (type === "err") el.classList.add("err");
  }

  // 1) Reset DB
  document.getElementById("btn-reset-db").addEventListener("click", async () => {
    if (!confirm("Reset dynamic tables (Enrollments, Payment, counters)?")) return;

    setStatus(statusReset, "Running reset transaction...");
    try {
      const data = await apiJson("/api/gui/init", { method: "POST" }, "[TX]");
      setStatus(statusReset, data.message || "Reset completed", "ok");
    } catch (e) {
      console.error(e);
      setStatus(statusReset, e.message, "err");
    }
  });

  // 2) Batch enrollment transaction
  document.getElementById("btn-run-enrollment").addEventListener("click", async () => {
    const sectionId = sectionIdInput.value.trim();
    const rawStudents = studentIdsInput.value.trim();
    if (!sectionId || !rawStudents) {
      setStatus(statusEnrollment, "SectionID and StudentIDs are required", "err");
      return;
    }

    const students = rawStudents
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (students.length === 0) {
      setStatus(statusEnrollment, "No valid StudentIDs found", "err");
      return;
    }

    setStatus(statusEnrollment, "Running enrollment transaction...");
    enrollmentResults.innerHTML = "";

    try {
      const data = await apiJson(
        "/api/gui/enroll-batch",
        { method: "POST", body: { sectionId, students } },
        "[TX]"
      );

      setStatus(statusEnrollment, `Transaction finished for section ${data.sectionId}`, "ok");

      if (!data.results || data.results.length === 0) {
        enrollmentResults.innerHTML = "<div class='small'>No results.</div>";
        return;
      }

      let html = "<div style='max-height:200px;overflow:auto'><table>";
      html += "<thead><tr><th>StudentID</th><th>Success</th><th>Message</th></tr></thead><tbody>";
      for (const r of data.results) {
        html += `<tr>
          <td>${r.studentId}</td>
          <td>${r.success ? "✔" : "✖"}</td>
          <td>${r.message || ""}</td>
        </tr>`;
      }
      html += "</tbody></table></div>";
      enrollmentResults.innerHTML = html;
    } catch (e) {
      console.error(e);
      setStatus(statusEnrollment, e.message, "err");
    }
  });

  document
    .getElementById("btn-clear-enrollment")
    .addEventListener("click", () => {
      enrollmentResults.innerHTML = "";
      setStatus(statusEnrollment, "");
    });

    // 2B) Batch Payment
document.getElementById("btn-run-batch-payment").addEventListener("click", async () => {
  const rawStudents = document.getElementById("payment-student-ids").value.trim();
  const statusPayment = document.getElementById("status-payment");
  const paymentResults = document.getElementById("payment-results");

  if (!rawStudents) {
    setStatus(statusPayment, "StudentIDs are required", "err");
    return;
  }

  const students = rawStudents.split(",").map(s => s.trim()).filter(Boolean);
  if (!students.length) {
    setStatus(statusPayment, "No valid Student IDs", "err");
    return;
  }

  setStatus(statusPayment, "Processing payments...");
  paymentResults.innerHTML = "";

  try {
    const data = await apiJson(
      "/api/gui/enroll-batch/pay",
      { method: "POST", body: { students } },
      "[PAY]"
    );

    setStatus(statusPayment, "Batch payment completed", "ok");

    // Show results
    let html = "<div style='max-height:200px;overflow:auto'><table>";
    html += "<thead><tr><th>StudentID</th><th>Success</th><th>Message</th></tr></thead><tbody>";
    for (const r of data.results) {
      html += `
        <tr>
          <td>${r.studentId}</td>
          <td>${r.success ? "✔" : "✖"}</td>
          <td>${r.message || ""}</td>
        </tr>`;
    }
    html += "</tbody></table></div>";

    paymentResults.innerHTML = html;

  } catch (e) {
    setStatus(statusPayment, e.message, "err");
  }
});

// Clear Payment Results
document.getElementById("btn-clear-payment").addEventListener("click", () => {
  document.getElementById("payment-results").innerHTML = "";
  setStatus(statusPayment, "");
});


  // 4) Table browser
  document.getElementById("btn-load-table").addEventListener("click", async () => {
    const table = tableSelect.value;
    setStatus(statusTable, `Loading table ${table}...`);
    tableResults.innerHTML = "";

    try {
      const data = await apiJson(
        `/api/gui/table/${encodeURIComponent(table)}`,
        { method: "GET" },
        "[Q]"
      );
      setStatus(
        statusTable,
        `Loaded ${data.rows ? data.rows.length : 0} row(s) from ${table}`,
        "ok"
      );
      renderTable("table-results", data);
    } catch (e) {
      console.error(e);
      setStatus(statusTable, e.message, "err");
    }
  });

  // 5) Reports
  document
    .getElementById("btn-report-enrollment")
    .addEventListener("click", async () => {
      setStatus(statusReport, "Running enrollment summary...");
      reportResults.innerHTML = "";
      try {
        const data = await apiJson(
          "/api/gui/report/enrollment-summary",
          { method: "GET" },
          "[Q]"
        );
        setStatus(
          statusReport,
          `Enrollment summary: ${data.rows ? data.rows.length : 0} row(s).`,
          "ok"
        );
        renderTable("report-results", data);
      } catch (e) {
        console.error(e);
        setStatus(statusReport, e.message, "err");
      }
    });

  document
    .getElementById("btn-report-revenue")
    .addEventListener("click", async () => {
      setStatus(statusReport, "Running revenue summary...");
      reportResults.innerHTML = "";
      try {
        const data = await apiJson(
          "/api/gui/report/revenue-summary",
          { method: "GET" },
          "[Q]"
        );
        setStatus(
          statusReport,
          `Revenue summary: ${data.rows ? data.rows.length : 0} row(s).`,
          "ok"
        );
        renderTable("report-results", data);
      } catch (e) {
        console.error(e);
        setStatus(statusReport, e.message, "err");
      }
    });

  // 6) SQL console (SELECT / WITH only)
  document.getElementById("btn-run-sql").addEventListener("click", async () => {
    const sql = sqlInput.value.trim();
    if (!sql) {
      setStatus(statusSql, "SQL cannot be empty", "err");
      return;
    }

    setStatus(statusSql, "Executing SQL...");
    sqlResult.innerHTML = "";

    try {
      const data = await apiJson(
        "/api/gui/query",
        { method: "POST", body: { sql } },
        "[Q]"
      );
      setStatus(
        statusSql,
        `Query OK: ${data.rows ? data.rows.length : 0} row(s).`,
        "ok"
      );
      renderTable("sql-result", data);
    } catch (e) {
      console.error(e);
      setStatus(statusSql, e.message, "err");
    }
  });

  document.getElementById("btn-clear-sql").addEventListener("click", () => {
    sqlResult.innerHTML = "";
    setStatus(statusSql, "");
  });
});
