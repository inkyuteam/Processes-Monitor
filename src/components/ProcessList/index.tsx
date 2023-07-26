import { useEffect, useMemo, useState } from "react";
import CustomizableTable from "../CustomizableTable";
import { DataItem } from "../../interfaces";
import { columnsForLinux, columnsForWindows } from "../../config";
import { checkOperatingSystem } from "../../controller/osController";

const intervalDelay = 3000;

const ProcessList = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [operatingSystem, setOperatingSystem] = useState(
    checkOperatingSystem()
  );

  useEffect(() => {
    const getAllProcessesInfo = () => {
      window.electronAPI.getAllProcessesInfo().then((data: DataItem[]) => {
        return setData(
          data.map((item: DataItem) => {
            return { ...{ id: item.pid }, ...item };
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
      case "Windows":
        return columnsForWindows;
      case "Linux":
        return columnsForLinux;
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
        <h1 className="absolute top-4 right-4 text-white">
          You're on {operatingSystem} Environment.
        </h1>
        <CustomizableTable
          data={data}
          columns={columns}
          logHandler={(sortColumn, sortOrder) =>
            window.electronAPI.logSortingAction(sortColumn, sortOrder)
          }
        />
      </div>
    </>
  );
};

export default ProcessList;
