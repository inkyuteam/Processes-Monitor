import { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import "./index.css";

const ProcessList = () => {
  const [processes, setProcesses] = useState([]);

  const parseCSVData = (csvData) => {
    const lines = csvData.trim().split("\n");
    const headers = lines[0].split(",");
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j].trim();
      }

      result.push(obj);
    }

    return result;
  };

  useEffect(() => {
    ipcRenderer.send("getProcessList");

    ipcRenderer.on("processList", (_, data) => {
      // Parse the data received from the main process and update the state
      const parsedData = parseCSVData(data);
      setProcesses(parsedData);
    });

    return () => {
      ipcRenderer.removeAllListeners("processList"); // Clean up the event listener when the component unmounts
    };
  }, []);

  return (
    <>
      <div className="table-container">
        <table className="processes-table">
          <thead>
            <th>Image Name</th>
            <th>PID</th>
            <th>Mem Usage</th>
          </thead>
          <tbody>
            {processes.map((process) => (
              <tr key={process.pid}>
                <td>{process.image}</td>
                <td>{process.pid}</td>
                <td>{process.memUsage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProcessList;
