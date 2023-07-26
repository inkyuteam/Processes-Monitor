export const checkOperatingSystem = () => {
  const platform = window.navigator.platform.toLowerCase();
  if (platform.indexOf("win") !== -1) {
    return "Windows";
  } else if (platform.indexOf("linux") !== -1) {
    return "Linux";
  } else {
    return "Unknown";
  }
};
