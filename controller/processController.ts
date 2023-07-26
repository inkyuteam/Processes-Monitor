import { exec } from 'child_process'

export const getAllProcessesInfo = () => {
  return new Promise((resolve, reject) => {
    const command = process.platform === 'win32' ? 'tasklist -fo csv' : 'ps -o pid,rss,cmd';

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error executing tasklist: ${err.message}`);
        return reject(err);
      }

      if (process.platform === 'win32') {
        // Process for Windows (tasklist output)
        const processes = stdout.trim().split('\r\n').map((line, index) => {
          if (index === 0) return null; // Skip the header row
          const [imageName, pid, sessionName, sessionNumber, memUsage] = line.trim().split('","');
          // Remove double quotes from the values
          return {
            imageName: imageName.replace(/^"|"$/g, ''),
            pid: pid.replace(/^"|"$/g, ''),
            sessionName: sessionName.replace(/^"|"$/g, ''),
            sessionNumber: sessionNumber.replace(/^"|"$/g, ''),
            memUsage: memUsage.replace(/^"|"$/g, ''),
          };
        });

        // Remove the null element (header row) from the array
        processes.shift();

        resolve(processes);
      } else {
        // Process for non-Windows (ps output)
        const processes = stdout.trim().split('\n').slice(1).map((line) => {
          const [pid, rss, cmd] = line.trim().split(/\s+/);
          return {
            pid,
            rss,
            cmd,
          };
        });

        resolve(processes);
      }
    });
  });
}