import express from "express";
import cors from "cors";
import axios from "axios";
import { parseStringPromise } from "xml2js";

const app = express();
app.use(cors());

app.get("/rss", async (req, res) => {
  try {
    const url = req.query.url;

    const response = await axios.get(url);
    const result = await parseStringPromise(response.data);

    const items = result.rss.channel[0].item.map((item) => ({
      title: item.title[0],
      link: item.link[0],
      pubDate: item.pubDate[0],
      description: item.description[0],
    }));

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch RSS" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));