import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/badge/badge';
import { Checkbox } from '@/components/form/checkbox/checkbox';

import { DataTable } from './data-table';

type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  category: 'food' | 'entertainment' | 'transport' | 'utilities';
  name: string;
};

const data: Payment[] = [
  { id: '1', name: 'Pizza', amount: 100, status: 'pending', category: 'food' },
  { id: '2', name: 'Concert', amount: 200, status: 'processing', category: 'entertainment' },
  { id: '3', name: 'Taxi', amount: 50, status: 'success', category: 'transport' },
  { id: '4', name: 'Electricity', amount: 150, status: 'failed', category: 'utilities' },
  { id: '5', name: 'Groceries', amount: 75, status: 'success', category: 'food' },
];

const columns: Array<ColumnDef<Payment>> = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(Boolean(value));
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(Boolean(value));
        }}
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    enableSorting: true,
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    cell: ({ row }) => `$${row.getValue('amount')}`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.getValue('status') === 'success' ? 'default' : 'destructive'}>
        {row.getValue('status')}
      </Badge>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    filterFn: 'arrIncludesSome',
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Core/Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => {
    return (
      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        facetedFilters={[
          {
            title: 'Status',
            options: [
              { label: 'Success', value: 'success' },
              { label: 'Pending', value: 'pending' },
              { label: 'Processing', value: 'processing' },
              { label: 'Failed', value: 'failed' },
            ],
          },
          {
            title: 'Category',
            options: [
              { label: 'Food', value: 'food' },
              { label: 'Entertainment', value: 'entertainment' },
              { label: 'Transport', value: 'transport' },
              { label: 'Utilities', value: 'utilities' },
            ],
          },
        ]}
      />
    );
  },
};

export const Playground: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={data}
          searchKey="name"
          facetedFilters={[
            {
              title: 'Status',
              options: [
                { label: 'Success', value: 'success' },
                { label: 'Pending', value: 'pending' },
                { label: 'Processing', value: 'processing' },
                { label: 'Failed', value: 'failed' },
              ],
            },
            {
              title: 'Category',
              options: [
                { label: 'Food', value: 'food' },
                { label: 'Entertainment', value: 'entertainment' },
                { label: 'Transport', value: 'transport' },
                { label: 'Utilities', value: 'utilities' },
              ],
            },
          ]}
        />
      </div>
    );
  },
};
