import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils';
import { DataTableRowActions } from '@/components/containers/table/data-table-row-actions';
import { type ColumnDef } from "@tanstack/react-table";
import { IBot } from '../type';

export const columnsBots: Array<ColumnDef<IBot>> = [
  {
    accessorKey: "id",
    header: "id",
    cell: ({ row }) => <span>{row.original.id}</span>,
  },
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "number",
    header: "number",
  },
  {
    accessorKey: "status",
    header: "ສະຖານະ",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <> {getStatus(status)}</>
      );
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row: { original: row } }) => {
      const rwoId = row.id;
      return <DataTableRowActions rowId={rwoId} resource="user" />;
    },
  },
];

const getStatus = (status: boolean) => {
  const label = status ? "ເປິດໃຊ້ງານ" : "ປິດໃຊ້ງານ";
  return <Badge variant="outline" className={cn(status ? "bg-green-500" : " bg-red-500", "text-white")}>{label}</Badge>;
};
