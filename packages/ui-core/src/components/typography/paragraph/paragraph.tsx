import type { ClassValue } from 'clsx';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function Paragraph({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className?: ClassValue;
}>) {
  return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>{children}</p>;
}
