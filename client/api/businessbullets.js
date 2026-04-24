export default async function handler(req, res) {
  try {
    const response = await fetch();
    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
}