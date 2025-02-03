const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const readFile = require("./utils/readFile");
const filePath = "./logs.txt";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", async (socket) => {
  const lastLines = await readFile(filePath);
  console.log(lastLines);
  io.emit("connectLogs", lastLines);
  console.log(`User connected: ${socket.id}`);
});

fs.watchFile(filePath, async (curr, prev) => {
  try {
    const lastLines = await readFile(filePath);
    console.log(lastLines);
    io.emit('logs',lastLines)
  } catch (error) {
    console.log("Error Reading Lines: " + error);
  }
});

server.listen(3000, () => {
  console.log("Socket server running on port 3000");
});
