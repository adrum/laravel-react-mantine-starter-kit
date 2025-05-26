import React from 'react';
import {
  MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  useMantineReactTable,
  MRT_TableBodyCellValue,
  MRT_Row,
} from 'mantine-react-table';
import {
  ActionIcon,
  Divider,
  Flex,
  Menu,
  Stack,
  Table,
  Title,
  Text,
  Group,
} from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';

// Updated to match your exact PaginatedCollection type
export interface PaginatedData<T extends object> {
  data: Array<T>;
  links: any;
  current_page: number;
  first_page_url: string | null;
  from: number;
  last_page: number;
  last_page_url: string | null;
  next_page_url: string | null;
  path: string;
  per_page: string;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ActionDef<T> {
  label: string;
  icon?: React.ReactNode;
  color?: string;
  onClick?: (item: T) => void;
  href?: string | ((item: T) => string);
  show?: (item: T) => boolean;
  divider?: boolean;
}

export interface GenericMRTProps<T extends object> {
  data: PaginatedData<T>;
  columns: MRT_ColumnDef<T>[];
  actions?: ActionDef<T>[];
  title?: string;
  enableRowSelection?: boolean;
  enableGlobalFilter?: boolean;
  initialPageSize?: number;
  pageSizeOptions?: string[];
  emptyMessage?: string;
  onSearch?: (searchTerm: string) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  serverSide?: boolean;
}

// Action cell component
function ActionCell<T extends object>({
  row,
  actions
}: {
  row: MRT_Row<T>;
  actions: ActionDef<T>[]
}) {
  const item = row.original;

  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <Group justify="flex-end">
      <Menu shadow="md" position="bottom-end">
        <Menu.Target>
          <ActionIcon variant="subtle" color="gray" size="sm">
            <IconDots size={16} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {actions.map((action, index) => {
            if (action.show && !action.show(item)) {
              return null;
            }

            if (action.divider) {
              return <Menu.Divider key={`divider-${index}`} />;
            }

            const href = typeof action.href === 'function'
              ? action.href(item)
              : action.href;

            return (
              <Menu.Item
                key={index}
                component={href ? Link : 'button'}
                href={href}
                color={action.color}
                leftSection={action.icon}
                onClick={href ? undefined : () => action.onClick?.(item)}
              >
                {action.label}
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

export default function GenericTable<T extends object>({
  data,
  columns,
  actions = [],
  title,
  enableRowSelection = false,
  enableGlobalFilter = true,
  initialPageSize = 10,
  pageSizeOptions = ['5', '10', '15', '25', '50'],
  emptyMessage = 'No data found',
  onSearch,
  onPageChange,
  onPageSizeChange,
  serverSide = false,
}: GenericMRTProps<T>) {

  // Add actions column if actions are provided
  const finalColumns: MRT_ColumnDef<T>[] = React.useMemo(() => {
    const cols = [...columns];

    if (actions.length > 0) {
      cols.push({
        accessorKey: '_actions' as keyof T,
        header: 'Actions',
        enableSorting: false,
        enableGlobalFilter: false,
        size: 100,
        Cell: ({ row }) => <ActionCell row={row} actions={actions} />,
      });
    }

    return cols;
  }, [columns, actions]);

  const table = useMantineReactTable({
    columns: finalColumns,
    data: data.data,
    enableRowSelection,
    initialState: {
      pagination: {
        pageSize: initialPageSize,
        pageIndex: 0, // Start at page 0, will be overridden by state if serverSide
      },
      showGlobalFilter: enableGlobalFilter,
    },
    // Server-side pagination
    manualPagination: serverSide,
    rowCount: serverSide ? data.total : undefined,
    // Server-side filtering
    manualFiltering: serverSide,
    onGlobalFilterChange: serverSide ? onSearch : undefined,
    // Pagination props
    mantinePaginationProps: {
      rowsPerPageOptions: pageSizeOptions,
    },
    paginationDisplayMode: 'pages',
    // Custom pagination handlers
    onPaginationChange: ({ pageIndex, pageSize }) => {
      if (serverSide) {
        if (pageIndex + 1 !== data.current_page && onPageChange) {
          onPageChange(pageIndex + 1);
        }
        if (pageSize !== Number(data.per_page) && onPageSizeChange) {
          onPageSizeChange(pageSize);
        }
      }
    },
    // Empty state
    renderEmptyRowsFallback: () => (
      <Text ta="center" py="xl" c="dimmed">
        {emptyMessage}
      </Text>
    ),
    // Disable features that don't work well with server-side
    enableColumnFilters: !serverSide,
    enableSorting: !serverSide,
    // Control the state from props when server-side
    state: serverSide ? {
      pagination: {
        pageIndex: data.current_page - 1,
        pageSize: Number(data.per_page),
      },
    } : undefined,
  });

  return (
    <Stack>
      {title && (
        <>
          <Title order={4}>{title}</Title>
          <Divider />
        </>
      )}

      <Flex justify="space-between" align="center">
        {enableGlobalFilter && <MRT_GlobalFilterTextInput table={table} />}
        <MRT_TablePagination table={table} />
      </Flex>

      {/* Custom table using Mantine components but with MRT logic */}
      <Table
        highlightOnHover
        striped
        withTableBorder
        withColumnBorders
      >
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : header.column.columnDef.Header ??
                      header.column.columnDef.header}
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
                    <MRT_TableBodyCellValue cell={cell} table={table} />
                  </Table.Td>
                ))}
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={finalColumns.length} style={{ textAlign: 'center' }}>
                <Text c="dimmed" py="xl">{emptyMessage}</Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
    </Stack>
  );
}
