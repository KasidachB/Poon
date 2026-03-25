const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Make sure DB folder exists (important for Render)
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create / open SQLite database file
const dbPath = path.join(dataDir, "survey.db");
const db = new Database(dbPath);

// Create table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS survey_responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Gaming section
    gaming_frequency TEXT,
    gaming_hours TEXT,
    gaming_platforms TEXT,
    gaming_genres TEXT,
    gaming_social_importance INTEGER,
    gaming_news_following TEXT,
    gaming_political_themes TEXT,
    gaming_political_thinking INTEGER,

    -- Political Attitudes section
    political_interest INTEGER,
    voted_2022 TEXT,
    freedom_of_speech_attitude TEXT,
    political_trust INTEGER,
    political_news_sources TEXT,
    politics_in_gaming TEXT,
    games_influence_politics INTEGER,
    important_political_issues TEXT,

    -- Demographics section
    age_group TEXT,
    gender TEXT,
    occupation TEXT,
    education_level TEXT,
    location TEXT,
    open_comments TEXT,

    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// Health check route
app.get("/", (req, res) => {
  res.send("✅ Survey backend is running");
});

// API route to save survey response
app.post("/api/submit-survey", (req, res) => {
  try {
    const data = req.body;

    console.log("📥 Incoming survey data:", data);

    const stmt = db.prepare(`
      INSERT INTO survey_responses (
        gaming_frequency,
        gaming_hours,
        gaming_platforms,
        gaming_genres,
        gaming_social_importance,
        gaming_news_following,
        gaming_political_themes,
        gaming_political_thinking,

        political_interest,
        voted_2022,
        freedom_of_speech_attitude,
        political_trust,
        political_news_sources,
        politics_in_gaming,
        games_influence_politics,
        important_political_issues,

        age_group,
        gender,
        occupation,
        education_level,
        location,
        open_comments
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      data.gaming_frequency || "",
      data.gaming_hours || "",
      data.gaming_platforms || "",
      data.gaming_genres || "",
      data.gaming_social_importance ?? null,
      data.gaming_news_following || "",
      data.gaming_political_themes || "",
      data.gaming_political_thinking ?? null,

      data.political_interest ?? null,
      data.voted_2022 || "",
      data.freedom_of_speech_attitude || "",
      data.political_trust ?? null,
      data.political_news_sources || "",
      data.politics_in_gaming || "",
      data.games_influence_politics ?? null,
      data.important_political_issues || "",

      data.age_group || "",
      data.gender || "",
      data.occupation || "",
      data.education_level || "",
      data.location || "",
      data.open_comments || ""
    );

    res.json({
      success: true,
      id: result.lastInsertRowid,
      message: "Survey response saved successfully!"
    });
  } catch (error) {
    console.error("❌ Database insert error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to save survey response"
    });
  }
});

// JSON route to inspect all responses
app.get("/api/all-responses", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM survey_responses ORDER BY id DESC").all();
    res.json(rows);
  } catch (error) {
    console.error("❌ Fetch responses error:", error);
    res.status(500).json({ error: "Failed to fetch responses." });
  }
});

// Export all responses as CSV
app.get("/export-csv", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM survey_responses ORDER BY id DESC").all();

    if (rows.length === 0) {
      return res.status(200).send("No survey responses found.");
    }

    const headers = Object.keys(rows[0]);

    const escapeCsv = (value) => {
      if (value === null || value === undefined) return "";
      const str = String(value);
      const escaped = str.replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const csvRows = [
      headers.join(","),
      ...rows.map((row) =>
        headers.map((header) => escapeCsv(row[header])).join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", "attachment; filename=survey_responses.csv");
    res.send(csvContent);
  } catch (error) {
    console.error("❌ CSV export error:", error);
    res.status(500).send("Failed to export CSV.");
  }
});

// Optional browser table view
app.get("/responses", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM survey_responses ORDER BY id DESC").all();

    const tableRows = rows.map(row => `
      <tr>
        <td>${row.id}</td>
        <td>${row.gaming_frequency || ""}</td>
        <td>${row.gaming_hours || ""}</td>
        <td>${row.gaming_platforms || ""}</td>
        <td>${row.gaming_genres || ""}</td>
        <td>${row.gaming_social_importance ?? ""}</td>
        <td>${row.gaming_news_following || ""}</td>
        <td>${row.gaming_political_themes || ""}</td>
        <td>${row.gaming_political_thinking ?? ""}</td>
        <td>${row.political_interest ?? ""}</td>
        <td>${row.voted_2022 || ""}</td>
        <td>${row.freedom_of_speech_attitude || ""}</td>
        <td>${row.political_trust ?? ""}</td>
        <td>${row.political_news_sources || ""}</td>
        <td>${row.politics_in_gaming || ""}</td>
        <td>${row.games_influence_politics ?? ""}</td>
        <td>${row.important_political_issues || ""}</td>
        <td>${row.age_group || ""}</td>
        <td>${row.gender || ""}</td>
        <td>${row.occupation || ""}</td>
        <td>${row.education_level || ""}</td>
        <td>${row.location || ""}</td>
        <td>${row.open_comments || ""}</td>
        <td>${row.submitted_at || ""}</td>
      </tr>
    `).join("");

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Survey Responses</title>
        <meta charset="UTF-8" />
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background: #f8fafc; color: #111827; }
          .table-wrap { overflow-x: auto; background: white; border-radius: 12px; padding: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); }
          table { border-collapse: collapse; min-width: 2200px; width: 100%; }
          th, td { border: 1px solid #e5e7eb; padding: 8px 10px; text-align: left; vertical-align: top; font-size: 14px; }
          th { background: #111827; color: white; position: sticky; top: 0; }
          tr:nth-child(even) { background: #f9fafb; }
          td { max-width: 280px; word-wrap: break-word; white-space: normal; }
          .btn { display: inline-block; padding: 10px 14px; background: #111827; color: white; text-decoration: none; border-radius: 8px; margin-right: 10px; }
        </style>
      </head>
      <body>
        <h1>Survey Responses</h1>
        <p>Total responses: ${rows.length}</p>
        <p>
          <a class="btn" href="/export-csv">Download CSV</a>
          <a class="btn" href="/api/all-responses">View JSON</a>
        </p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Gaming Frequency</th>
                <th>Gaming Hours</th>
                <th>Platforms</th>
                <th>Genres</th>
                <th>Social Importance</th>
                <th>Gaming News</th>
                <th>Political Themes in Games</th>
                <th>Games & Political Thinking</th>
                <th>Political Interest</th>
                <th>Voted 2022</th>
                <th>Freedom of Speech Attitude</th>
                <th>Political Trust</th>
                <th>Political News Sources</th>
                <th>Politics in Gaming</th>
                <th>Games Influence Politics</th>
                <th>Important Political Issues</th>
                <th>Age Group</th>
                <th>Gender</th>
                <th>Occupation</th>
                <th>Education</th>
                <th>Location</th>
                <th>Open Comments</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("❌ HTML view error:", error);
    res.status(500).send("Failed to load responses.");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Survey backend running on port ${PORT}`);
  console.log(`📁 SQLite DB path: ${dbPath}`);
});