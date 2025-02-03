import { useEffect, useState } from "react";
const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");

export default function LogPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server on port 3000");
    });
    socket.on("connectLogs", (data) => {
      setLogs(data);
    });
  }, []);

  socket.on("logs", (data) => {
    setLogs(data);
  });

  return (
    <>
      <h1>Logs: </h1>
      <div>
        {logs.length > 0 ? (
          logs
            .slice()
            .reverse()
            .map((log, index) => <p key={index}>{index + ". " + log}</p>)
        ) : (
          <h2>No Logs Found!</h2>
        )}
      </div>
    </>
  );
}
