import { useEffect, useState } from "react";
import CustomizableTable from "../CustomizableTable";

const ProcessList = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns([
      { key: "imageName", title: "Image Name", dataKey: "imageName" },
      { key: "pid", title: "PID", dataKey: "pid" },
      { key: "memUsage", title: "Mem Usage", dataKey: "memUsage" },
    ]);

    const getAllProcessesInfo = () => {
      window.electronAPI.getAllProcessesInfo().then((data) => {
        setData(
          data.map((item) => {
            return { id: item.pid, ...item };
          })
        );
      });
    };

    getAllProcessesInfo();

    const intervalId = setInterval(() => {
      getAllProcessesInfo();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
