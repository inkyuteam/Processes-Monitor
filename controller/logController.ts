import { app } from 'electron'
import fs from "fs";
import path from "path";

const logFileName = `${Date.now()}.log`;

export const logSortingAction = (sortKey, sortOrder) => {
  const logEntry = `Sorting by ${sortKey}, Order: ${sortOrder}\n`;

  const logFilePath = path.join(app.getPath("userData"), "logs", logFileName);

  const logFileDirectory = path.dirname(logFilePath);

  // Create the log file directory if it does not exist
  fs.mkdirSync(logFileDirectory, { recursive: true });

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
}