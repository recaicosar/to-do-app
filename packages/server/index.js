import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:6006"],
};

app.get("/todosList", cors(corsOptions), (_, res) => {
  const response = [
    {
      id: "1",
      name: "Very Important test",
      priority: {
        score: 3,
        title: "Urgent",
      },
    },
    {
      id: "2",
      name: "Very Important test",
      priority: {
        score: 3,
        title: "Urgent",
      },
    },
    {
      id: "3",
      name: "Simple complication test",
      priority: {
        score: 2,
        title: "Regular",
      },
    },
    {
      id: "4",
      name: "Article Refactoring test",
      priority: {
        score: 1,
        title: "Trivial",
      },
    },
    {
      id: "5",
      name: "Thread manufacturing test",
      priority: {
        score: 2,
        title: "Regular",
      },
    },
  ];

  res.status(200).json(response);
});

app.get("/prioritiesList", cors(corsOptions), (_, res) => {
  const response = [
    { title: "Urgent", score: 3 },
    { title: "Regular", score: 2 },
    { title: "Trivial", score: 1 },
  ];

  res.status(200).json(response);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
