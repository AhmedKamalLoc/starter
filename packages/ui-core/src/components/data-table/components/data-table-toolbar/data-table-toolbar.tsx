'use client';

import type { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Button } from '@/components/button/button';
import { Input } from '@/components/form/input/input';

import type { DataTableFacetedFilterOption } from '../../data-table.type';
import { DataTableFacetedFilter } from '../data-table-faceted-filter/data-table-faceted-filter';
import { DataTableViewOptions } from '../data-table-view-options/data-table-view-options';

export type FacetedFilter = {
  title: string;
  options: DataTableFacetedFilterOption[];
};

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  facetedFilters?: FacetedFilter[];
  searchKey?: keyof TData;
};

export function DataTableToolbar<TData>({
  table,
  facetedFilters,
  searchKey,
}: Readonly<DataTableToolbarProps<TData>>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchKey ? (
          <Input
            placeholder="Search..."
            value={table.getColumn(String(searchKey))?.getFilterValue() as string}
            onChange={(event) =>
              table.getColumn(String(searchKey))?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ) : null}

        {facetedFilters?.map(({ title, options }) => (
          <DataTableFacetedFilter
            key={title}
            column={table.getColumn(title)}
            title={title}
            options={options}
          />
        ))}

        {isFiltered ? (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        ) : null}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
