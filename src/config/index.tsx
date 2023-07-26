export const columnsForWindows = [
  {
    key: "imageName",
    title: "Image Name",
    dataKey: "imageName",
    type: "text",
  },
  { key: "pid", title: "PID", dataKey: "pid", type: "integer" },
  {
    key: "memUsage",
    title: "Mem Usage",
    dataKey: "memUsage",
    type: "integer",
  },
];

export const columnsForLinux = [
  { key: "pid", title: "PID", dataKey: "pid", type: "integer" },
  { key: "rss", title: "RSS", dataKey: "rss", type: "integer" },
  { key: "cmd", title: "CMD", dataKey: "cmd", type: "text" },
];
