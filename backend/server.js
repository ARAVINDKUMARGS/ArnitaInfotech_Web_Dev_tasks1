const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Assignment = mongoose.model("Assignment", AssignmentSchema);

app.get("/assignments", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/assignments", async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
