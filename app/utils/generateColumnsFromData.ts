interface Column {
  name: string;
  selector: (row: any) => any;
  sortable?: boolean;
}

export const generateColumnsFromData = (data: Array<{ [key: string]: any }>): Column[] => {
  if (data.length === 0) {
    return [];
  }

  const headers = Object.keys(data[0]);

  const columns: Column[] = headers.map(header => ({
    name: header.charAt(0).toUpperCase() + header.slice(1),
    selector: (row: { [key: string]: any }) => row[header],
    sortable: true,
  }));

  return columns;
};
