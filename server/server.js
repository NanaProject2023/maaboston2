import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("Server is alive");
});

// RSS test route
app.get("/rss", async (req, res) => {
  try {
    const response = await fetch("https://feeds.npr.org/1001/rss.xml");
    const text = await response.text();

    res.set("Content-Type", "application/xml");
    res.send(text);
  } catch (error) {
    console.error("RSS fetch error:", error);
    res.status(500).send("Error fetching RSS");
  }
});


// IMPORTANT: this must exist
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});