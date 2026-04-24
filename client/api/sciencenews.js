export default async function handler(req, res) {
  try {
    const response = await fetch('https://feeds.npr.org/1001/rss.xml');
    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
}