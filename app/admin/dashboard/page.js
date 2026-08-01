"use client";
import React, { useState, useMemo, useCallback } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "./loading";

const GET_APPOINTMENTS = gql`
  query GetAppointments {
    appointments {
      _id
      id
      name
      email
      date
      subject
      desc
      status
      isVerifiedByAdmin
    }
  }
`;

const UPDATE_APPOINTMENT_STATUS = gql`
  mutation UpdateAppointmentStatus(
    $_id: ID!
    $email: String!
    $name: String!
    $status: String!
    $date: String!
  ) {
    updateAppointmentStatus(
      _id: $_id
      email: $email
      name: $name
      status: $status
      date: $date
    ) {
      message
      statusCode
      error
    }
  }
`;

const TableComponent = () => {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [localDates, setLocalDates] = useState({});

  const { data, loading } = useQuery(GET_APPOINTMENTS, {
    fetchPolicy: "cache-and-network",
  });

  const [updateStatus, { loading: mutating }] = useMutation(
    UPDATE_APPOINTMENT_STATUS,
    {
      refetchQueries: [{ query: GET_APPOINTMENTS }],
      onCompleted: ({ updateAppointmentStatus: result }) => {
        if (result.statusCode !== 201) {
          toast.error(result.error || result.message);
        } else {
          toast.success(result.message);
        }
      },
      onError: (err) => toast.error(err.message),
    }
  );

  const appointments = data?.appointments ?? [];

  // Merge server data with local date overrides from the DatePicker
  const tableData = useMemo(
    () =>
      appointments.map((item) => ({
        ...item,
        date: localDates[item._id] ?? new Date(item.date),
      })),
    [appointments, localDates]
  );

  const handleDateChange = useCallback((_id, newDate) => {
    setLocalDates((prev) => ({ ...prev, [_id]: newDate }));
  }, []);

  const handleStatus = useCallback(
    (appointment, newStatus) => {
      const date = localDates[appointment._id] ?? new Date(appointment.date);
      updateStatus({
        variables: {
          _id: appointment._id,
          email: appointment.email,
          name: appointment.name,
          status: newStatus,
          date: new Date(date).toISOString(),
        },
      });
    },
    [updateStatus, localDates]
  );

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
      },
      { accessorKey: "id", header: "Id" },
      { accessorKey: "name", header: "Name" },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("email")}</div>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
          <DatePicker
            selected={row.getValue("date")}
            onChange={(date) => handleDateChange(row.original._id, date)}
            className="w-[20vw] !min-w-32 sm:w-[80%] dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 duration-200 ease-in-out"
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Date For Appointment"
            id="appointment"
            popperProps={{ strategy: "fixed" }}
            popperPlacement="bottom-start"
          />
        ),
      },
      { accessorKey: "subject", header: "Subject" },
      { accessorKey: "desc", header: "Message" },
      { accessorKey: "status", header: "Status" },
      {
        id: "actions",
        header: "Action",
        enableHiding: true,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              disabled={mutating}
              className={mutating ? "text-gray-500" : "text-black"}
            >
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4 text-black dark:text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-center">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={row.getValue("status")}
                onValueChange={(status) => handleStatus(row.original, status)}
              >
                <DropdownMenuRadioItem value="confirm">
                  Confirm
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="reject">
                  Reject
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [handleDateChange, handleStatus, mutating]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading && appointments.length === 0) return <Loading />;

  return (
    <div className="w-full max-w-6xl m-auto p-5">
      <div className="flex items-center justify-around py-4 gap-3">
        <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm dark:border-2"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto dark:bg-gray-900">
              Filter <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark:bg-gray-900">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default TableComponent;
