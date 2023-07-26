import React, { useEffect, useState } from "react";
import {
  CustomizableTableProps,
  TableRowProps,
  SortOrder,
} from "../../interfaces";

const CustomizableTable: React.FC<CustomizableTableProps> = ({
  data,
  columns,
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);

  useEffect(() => {
    window.electronAPI.logSortingAction(sortColumn, sortOrder);
  }, [sortColumn, sortOrder]);

  const handleHeaderClick = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortOrder(
        sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC
      );
    } else {
      setSortColumn(columnKey);
      setSortOrder(SortOrder.ASC);
    }
  };

  const sortedData = React.useMemo(() => {
    const compareData = (a, b) => {
      let arg0, arg1;
      if (sortColumn === "imageName") {
        arg0 = a[sortColumn];
        arg1 = b[sortColumn];
      } else {
        const argString0 = a[sortColumn].replace(/[^\d]/g, "");
        const argString1 = b[sortColumn].replace(/[^\d]/g, "");
        arg0 = parseInt(argString0);
        arg1 = parseInt(argString1);
      }
      if (arg0 < arg1) return sortOrder === SortOrder.ASC ? -1 : 1;
      if (arg0 > arg1) return sortOrder === SortOrder.ASC ? 1 : -1;
      return 0;
    };

    if (sortColumn !== null) {
      const sorted = data.slice().sort((a, b) => compareData(a, b));

      return sorted;
    }
    return data;
  }, [data, sortColumn, sortOrder]);

  return (
    <table className="text-white border-collapse w-full">
      <thead>
        <tr className="bg-headerColor">
          {columns.map((column, index) => {
            return (
              <th
                className="p-4 cursor-pointer rounded-t-2xl"
                key={column.key}
                onClick={() => handleHeaderClick(column.dataKey)}
              >
                {column.title}{" "}
                {sortColumn === column.dataKey &&
                  (sortOrder === SortOrder.ASC ? "▲" : "▼")}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <TableRow
            key={item.id}
            data={item}
            columns={columns}
            oddRow={index % 2 === 0}
          />
        ))}
      </tbody>
    </table>
  );
};

const TableRow: React.FC<TableRowProps> = React.memo(
  ({ data, columns, oddRow }) => {
    const [previousData, setPreviousData] = useState(null);
    const [animationClass, setAnimationClass] = useState("");

    const rowClass = oddRow ? "bg-oddColor" : "";

    useEffect(() => {
      if (previousData) {
        const animateIdx = oddRow
          ? "animate-oddBgChange"
          : "animate-evenBgChange";
        const temp =
          JSON.stringify(previousData) != JSON.stringify(data)
            ? animateIdx
            : "";
        setAnimationClass(temp);
        setTimeout(() => setAnimationClass(""), 2000);
      }
      setPreviousData(data);
    }, [data]);

    return (
      <tr className={`cursor-pointer hover:bg-hoverColor ${rowClass}`}>
        {columns.map((column) => (
          <td
            className={`p-2 ${column.key === "memUsage" ? animationClass : ""}`}
            key={column.key}
          >
            {data[column.dataKey]}
          </td>
        ))}
      </tr>
    );
  }
);

export default CustomizableTable;
