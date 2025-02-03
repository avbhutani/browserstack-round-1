import { useEffect, useState } from "react";
const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");
export default function LogPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("connectLogs", (data) => {
        if(data.length === 0) {
            setLogs(['Log File is Empty!'])
            console.log(data);
        }
      setLogs(data);
    //   console.log("onConnect: " + logs);
    });
  }, []);

  socket.on("logs", (data) => {
    if(data.length === 0) {
        setLogs(['Log File is Empty!'])
        console.log(data);
    }
    setLogs(data);
    console.log("onChange: " + logs);
  });

  return (
    <>
        <h1>Logs: </h1>
      <div>
        {logs.slice().reverse().map((log, index) => (
          <p key={index}>{index + ". " + log}</p>
        ))}
      </div>
    </>
  );
}
