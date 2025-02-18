import { cn } from '@/lib/utils';

export function IconWrapper({
  children,
  className = '',
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={cn(
        'bg-white border items-center border-gray-200 rounded-xl shadow-sm w-14 h-14 p-3.5 flex justify-center self-center',
        className,
      )}
    >
      {children}
    </div>
  );
}
