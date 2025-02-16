"use client";

import { CreateButton } from "@/components/containers/create-button";
import { TitleLabel } from "@/components/containers/headerLabel";
import { DataTable } from "@/components/containers/table/data-table";
import { RoleBasedGuard } from "@/lib/ability";
import { columnsBots } from "./container/columns";
import useTable from "@/hooks/useTable";
import { IBot } from "./type";

export default function BotList() {
  const { result, meta, updatePagination } = useTable<IBot>({ resource: "bot" });
  return (
    <RoleBasedGuard subject="user" action="read" fallback={<div>You don&apos;t have permission to view this page</div>}>
      <div className="pl-4 space-y-2">
        <div className="flex justify-between items-center">
          <TitleLabel title='Bot Management' subtitle='This is a bot management page' />
          <CreateButton resouce="bot" title='Create Bot' />
        </div>
        <div className="space-y-4">
          <DataTable columns={columnsBots} data={mockData.result}  meta={meta}  />
          {/* <DataTable columns={columnsUser} data={result} meta={meta} updatePagination={updatePagination} /> */}
        </div>
      </div>
    </RoleBasedGuard>
  );
}
const mockData = {
  status: "ok",
  message: "success",
  meta: {
    isFirstPage: true,
    isLastPage: true,
    currentPage: 1,
    previousPage: null,
    nextPage: null,
    pageCount: 1,
    totalCount: 100,
  },
  result: [
    {
      id: 1,
      name: "ChatGPT Bot",
      status: "active",
      number: 1,
      createdAt: "2023-08-01",
      updatedAt: "2023-08-01",
    },
    {
      id: 2,
      name: "Bot 2",
      status: "active",
      number: 2,
      createdAt: "2023-08-01",
      updatedAt: "2023-08-01",
    },
    {
      id: 3,
      name: "Bot 3",
      status: "inactive",
      number: 3,
      createdAt: "2023-08-01",
      updatedAt: "2023-08-01",
    },
  ],
}
