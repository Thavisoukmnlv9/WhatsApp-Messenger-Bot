/* eslint-disable @typescript-eslint/naming-convention */
import { SelectAllCheckbox, SelectRowCheckbox } from "@/components/containers/column";
import { DataTableColumnHeader } from "@/components/containers/table/data-table-column-header";
import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import { type IUser } from "../../type";
import { type RoleLabels } from "../interface";

export const columnsUser: Array<ColumnDef<IUser>> = [
  {
    id: "select",
    header: ({ table }) => <SelectAllCheckbox table={table} />,
    cell: ({ row }) => <SelectRowCheckbox row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "ຊື່ບັນຊີເຂົ້າໃຊ້ລະບົບ",
    cell: ({ row }) => <span>{row.original.username}</span>,
  },
  {
    accessorKey: "firstName",
    header: "ຊື່ແທ້",
    cell: ({ row }) => <span>{row.original.firstName}</span>,
  },
  {
    accessorKey: "phone",
    header: "ເບີໂທລະສັບ",
    cell: ({ row }) => <span>{`+856 20${row.original.phone}`}</span>,
  },
  {
    accessorKey: "email",
    header: "ອີເມວ",
    cell: ({ row }) => <span>{row.original.email || "-"}</span>,
  },
  {
    accessorKey: "office.name",
    header: "ສັງກັດຫ້ອງການ",
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ສີດໃຊ້ງານ' />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") ?? "";
      return (
        <div className='flex space-x-2'>
          {getRoleLabel(role as keyof RoleLabels)}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "ສະຖານະ",
    cell: ({ row }) => {
      const status = row.original.isActive;
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

const roleLabels: RoleLabels = {
  STAFF: "ພະນັກງານ",
  ADMIN: "ແອັດມິນ",
  FINANCE: "ການເງິນ",
  POLICE_OFFICER: "ທີມຕື່ມຟອມ",
  POLICE_COMMANDER: "ທີມອະນຸມັດຟອມ",
  POLICE_PRODUCTION: "ທີມຜະລິດ",
};

const getRoleLabel = (role: keyof RoleLabels | string) => {
  const result = roleLabels[role as keyof RoleLabels];
  return <Badge variant="outline">{result}</Badge>;
};

const getStatus = (status: boolean) => {
  const label = status ? "ເປິດໃຊ້ງານ" : "ປິດໃຊ້ງານ";
  return <Badge variant="outline" className={cn(status ? "bg-green-500" : " bg-red-500", "text-white")}>{label}</Badge>;
};
