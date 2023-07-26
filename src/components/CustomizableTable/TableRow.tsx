import React, { useEffect, useState } from "react";
import {
  CustomizableTableProps,
  TableRowProps,
  SortOrder,
  DataItem,
} from "../../interfaces";

const TableRow: React.FC<TableRowProps> = React.memo(
  ({ data, columns, oddRow }) => {
    const [previousData, setPreviousData] = useState<DataItem>();
    const [animationClass, setAnimationClass] = useState("");
    const [changedKeyList, setChangedKeyList] = useState<string[]>([]);

    const rowClass = oddRow ? "bg-oddColor" : "";

    useEffect(() => {
      if (previousData) {
        const animateIdx = oddRow
          ? "animate-oddBgChange"
          : "animate-evenBgChange";
        const keys = Object.keys(previousData) as string[];
        let keyList: string[] = [];
        for (const key of keys) {
          if (previousData[key] != data[key]) {
            keyList.push(key);
          }
        }
        setChangedKeyList(keyList);
        setAnimationClass(keyList.length > 0 ? animateIdx : "");
        setTimeout(() => setAnimationClass(""), 2000);
      }
      setPreviousData(data);
    }, [data]);

    return (
      <tr className={`cursor-pointer hover:bg-hoverColor ${rowClass}`}>
        {columns.map((column) => (
          <td
            className={`p-2 ${
              changedKeyList.includes(column.key) ? animationClass : ""
            }`}
            key={column.key}
          >
            {data[column.dataKey]}
          </td>
        ))}
      </tr>
    );
  }
);

export default TableRow;
