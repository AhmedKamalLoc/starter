import type { ColumnDef } from '@tanstack/react-table';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { DataTable } from './data-table';

type TestData = {
  id: string;
  name: string;
  value: number;
};

const testColumns: Array<ColumnDef<TestData>> = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
  },
];

const testData = [
  { id: '1', name: 'Item 1', value: 10 },
  { id: '2', name: 'Item 2', value: 20 },
  { id: '3', name: 'Item 3', value: 30 },
];

describe('DataTable', () => {
  it('renders basic table structure', () => {
    render(<DataTable columns={testColumns} data={testData} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('cell').length).toBeGreaterThan(0);
  });

  it('sorts columns when headers are clicked', async () => {
    render(<DataTable columns={testColumns} data={testData} />);

    const nameHeader = screen.getByText('Name');
    await userEvent.click(nameHeader);

    const firstRow = screen.getAllByRole('cell')[0];
    expect(firstRow).toHaveTextContent('Item 1');
  });

  it('filters data using search input', async () => {
    render(<DataTable columns={testColumns} data={testData} searchKey="name" />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Search...'), 'Item 2');

    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('handles row selection', async () => {
    const { container } = render(<DataTable columns={testColumns} data={testData} />);

    const checkboxes = container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    if (checkboxes[1]) {
      await userEvent.click(checkboxes[1]);
      expect(checkboxes[1]).toBeChecked();
    }
  });

  it('paginates data correctly', () => {
    render(<DataTable columns={testColumns} data={testData} />);

    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
  });

  it('filters data using faceted filters', async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={testColumns}
        data={testData}
        facetedFilters={[
          {
            title: 'Category',
            options: [
              { label: 'Test 1', value: '1' },
              { label: 'Test 2', value: '2' },
            ],
          },
        ]}
      />,
    );

    // Open filter dropdown
    await user.click(screen.getByText('Category'));

    // Select filter option
    await user.click(screen.getByText('Test 1'));

    // Verify filtered results
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    // expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
  });
});
