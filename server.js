const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

const POST = process.env.PORT || 8888;
const LINE_BOT_API = "https://api.line.me/v2/bot";
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
};

app.post("/webhook", (req, res) => {
  const { events } = req.body;
  console.log("Received events:", events);
  if (!events || events.length === 0) {
    res.json({ messages: "ok" });
  }
  return;
});

app.post("/send-message", async (req, res) => {
  const { userId, messages } = req.body;
  const body = {
    to: userId,
    messages,
  };

  try {
    const resp = await axios.post(`${LINE_BOT_API}/message/push`, body, {
      headers,
    });
    // console.log("Message sent:", resp.data);
  } catch (error) {
    console.log("Error sending message:", error.response);
  }

  res.json({ success: true });
});

app.listen(POST, () => {
  console.log(`Server is running on port ${POST}`);
});
