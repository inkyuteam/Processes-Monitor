export interface Column {
  key: string;
  title: string;
  dataKey: string;
}

export interface DataItem {
  id: number;
  [key: string]: any;
}

export interface CustomizableTableProps {
  data: DataItem[];
  columns: Column[];
  onRowClick?: (id: number) => void;
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
