import React, { useEffect, useState } from "react";
import {
  CustomizableTableProps,
  TableRowProps,
  SortOrder,
  DataItem,
} from "../../interfaces";
import TableRow from "./TableRow";

const CustomizableTable: React.FC<CustomizableTableProps> = ({
  data,
  columns,
  logHandler,
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortColumnType, setSortColumnType] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);

  useEffect(() => {
    logHandler(sortColumn, sortOrder);
  }, [sortColumn, sortOrder]);

  const handleHeaderClick = (columnKey: string, columnType: string) => {
    if (sortColumn === columnKey) {
      setSortOrder(
        sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC
      );
    } else {
      setSortColumn(columnKey);
      setSortColumnType(columnType);
      setSortOrder(SortOrder.ASC);
    }
  };

  const sortedData = React.useMemo(() => {
    const compareData = (a: DataItem, b: DataItem): 1 | 0 | -1 => {
      if (!sortColumn) return 0;
      let arg0, arg1;
      if (sortColumnType === "text") {
        arg0 = a[sortColumn];
        arg1 = b[sortColumn];
      } else if (sortColumnType === "integer") {
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
      const sorted = data
        .slice()
        .sort((a: DataItem, b: DataItem) => compareData(a, b));

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
                onClick={() => handleHeaderClick(column.dataKey, column.type)}
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

export default CustomizableTable;
