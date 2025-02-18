import { type ComponentProps, Fragment } from 'react';

import { Chevron } from '@/components/icons/chevron';
import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumb as BreadcrumbPrimitive,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';

export type BreadcrumbItemType = {
  label: string;
  href?: string;
  className?: string;
};

type BreadcrumbProps = ComponentProps<typeof BreadcrumbPrimitive> & {
  items: BreadcrumbItemType[];
  separator?: React.ReactNode;
  className?: string;
  ellipsisThreshold?: number;
};

export function Breadcrumb({
  items,
  separator = <Chevron />,
  className,
  ellipsisThreshold = 3,
  ...props
}: BreadcrumbProps) {
  const isShouldTruncate = items.length > ellipsisThreshold;
  const visibleItems = items.slice(-ellipsisThreshold);

  return (
    <BreadcrumbPrimitive {...props} className={cn('mx-4 my-2', className)}>
      <BreadcrumbList>
        {isShouldTruncate ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
          </>
        ) : null}

        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;

          return (
            <Fragment key={item.href ?? item.label}>
              <BreadcrumbItem className={cn('text-gray-400 font-medium', item.className)}>
                {item.href ? (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className={cn({ 'text-purple-800 font-medium': isLast })}>
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < visibleItems.length - 1 && (
                <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbPrimitive>
  );
}
