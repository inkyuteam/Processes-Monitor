import { ipcMain } from "electron";
import { getAllProcessesInfo } from "../controller/processController";
import { logSortingAction } from "../controller/logController";

// Handle the IPC request from the renderer process
export const getProcessesHandler = async () => {
  try {
    const processes = await getAllProcessesInfo();
    return processes;
  } catch (err) {
    console.error("Error retrieving process information:", err);
    return [];
  }
};

// Handle the IPC event from the renderer process for sorting
export const sortProcessesHandler = async (_, sortKey, sortOrder) => {
  logSortingAction(sortKey, sortOrder);
};
