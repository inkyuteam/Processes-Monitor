import { useEffect, useMemo, useState } from "react";
import CustomizableTable from "../CustomizableTable";
import { DataItem } from "../../interfaces";

const intervalDelay = 3000;

const checkOperatingSystem = () => {
  const platform = window.navigator.platform.toLowerCase();
  if (platform.indexOf('win') !== -1) {
    return 'Windows';
  } else if (platform.indexOf('linux') !== -1) {
    return 'Linux';
  } else {
    return 'Unknown';
  }
}

const ProcessList = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [operatingSystem, setOperatingSystem] = useState(checkOperatingSystem());

  useEffect(() => {
    const getAllProcessesInfo = () => {
      window.electronAPI.getAllProcessesInfo().then((data: DataItem[]) => {
        return setData(
          data.map((item: DataItem) => {
            return { ...{id: item.pid}, ...item };
          })
        );
      });
    };

    getAllProcessesInfo();

    const intervalId = setInterval(getAllProcessesInfo, intervalDelay);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const columns = useMemo(() => {
    switch (operatingSystem) {
      case 'Windows':
        return [
          { key: "imageName", title: "Image Name", dataKey: "imageName" },
          { key: "pid", title: "PID", dataKey: "pid" },
          { key: "memUsage", title: "Mem Usage", dataKey: "memUsage" },
        ];
      case 'Linux':
        return [
          { key: "pid", title: "PID", dataKey: "pid" },
          { key: "rss", title: "RSS", dataKey: "rss" },
          { key: "cmd", title: "CMD", dataKey: "cmd" },
        ];
      default:
        return [];
    }
  }, [operatingSystem]);

  return (
    <>
      <div className="p-12">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Process List
          </span>
        </h1>
        <CustomizableTable
          data={data}
          columns={columns}
        />
      </div>
    </>
  );
};

export default ProcessList;
