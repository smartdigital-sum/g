const express = require("express");
const cors = require("cors");
const path = require("path");
const stories = require("./data/stories.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/stories", (req, res) => {
  const { grade } = req.query;
  if (grade) {
    const filtered = stories.filter((s) => s.grade === grade);
    return res.json(filtered);
  }
  res.json(stories);
});

app.get("/api/stories/:id", (req, res) => {
  const story = stories.find((s) => s.id === req.params.id);
  if (!story) {
    return res.status(404).json({ error: "Story not found" });
  }
  res.json(story);
});

app.get("/api/quiz/:storyId", (req, res) => {
  const story = stories.find((s) => s.id === req.params.storyId);
  if (!story || !story.quiz) {
    return res.status(404).json({ error: "Quiz not found" });
  }
  res.json(story.quiz);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Story Server running at http://localhost:${PORT}`);
});
