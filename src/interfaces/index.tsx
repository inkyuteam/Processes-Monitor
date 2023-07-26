export interface Column {
  key: string;
  title: string;
  dataKey: string;
  type: string;
}

export interface DataItem {
  id: number;
  [key: string]: any;
}

export interface CustomizableTableProps {
  data: DataItem[];
  columns: Column[];
  onRowClick?: (id: number) => void;
  logHandler?: (sortColumn: string | null, sortOrder: SortOrder) => void;
}

export interface TableRowProps {
  data: DataItem;
  columns: Column[];
  onRowClick?: (id: number) => void;
  oddRow: boolean;
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}
