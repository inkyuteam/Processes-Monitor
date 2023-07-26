const { contextBridge, ipcRenderer } = require('electron');

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sendMessage`
   */

  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },

  getAllProcessesInfo: async () => {
    try {
      return await ipcRenderer.invoke('get-processes');
    } catch (err) {
      console.error('Error retrieving process information:', err);
      return [];
    }
  },

  logSortingAction: async (sortKey, sortOrder) => {
    await ipcRenderer.invoke('sort-processes', sortKey, sortOrder);
  },
}

contextBridge.exposeInMainWorld('electronAPI', api);