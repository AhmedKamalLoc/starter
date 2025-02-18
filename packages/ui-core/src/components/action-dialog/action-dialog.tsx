'use client';

import React, { type RefObject, useMemo, useState } from 'react';

import { Button } from '@/components/button/button';
import { IconWrapper } from '@/components/icons/icon-wrapper/icon-wrapper';
import { TrashIcon } from '@/components/icons/trash-icon';
import { XCloseIcon } from '@/components/icons/xclose-icon';
import { Separator } from '@/components/separator/separator';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AlertDialogContext } from '@/context/action-dialog-context';
import { cn } from '@/lib/utils';

type ActionDialogProps = {
  title: string;
  description: string;
  action: React.ReactNode;
  children?: React.ReactNode;
  cancelButtonText?: string;
  icon?: React.ReactNode;
  trigger?: React.ReactNode;
  separator?: React.ReactNode;
  footerClassName?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCancel?: () => void;
  ref?: RefObject<HTMLDivElement>;
};

export function ActionDialog({
  title,
  description,
  cancelButtonText = 'Close',
  trigger,
  action,
  icon = <TrashIcon />,
  separator = <Separator />,
  children,
  footerClassName = '',
  isOpen = false,
  onOpenChange,
  onCancel,
  ref,
}: Readonly<ActionDialogProps>) {
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen);

  const handleChange = (open: boolean) => {
    onOpenChange?.(open);
    setIsDialogOpen(open);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    onCancel?.();
  };

  const providerValue = useMemo(() => ({ setOpen: setIsDialogOpen }), [setIsDialogOpen]);

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={handleChange}>
      <AlertDialogContext.Provider value={providerValue}>
        {trigger ? <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger> : null}
        <AlertDialogContent ref={ref} className="max-w-96 gap-y-6 p-0">
          <div className="p-6 pb-0">
            <AlertDialogTitle className="sr-only">{title}</AlertDialogTitle>
            <div
              data-testId="dialog-background"
              className="absolute -z-10 top-0 left-0 w-full h-full bg-[url(/icons/trash-bg.svg)] bg-no-repeat pointer-events-none"
            />
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between w-full">
                {icon ? <IconWrapper className="p-2">{icon}</IconWrapper> : null}

                <AlertDialogCancel onClick={handleCancel} asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    icon={<XCloseIcon className="size-6" />}
                    className="shadow-none border-none hover:bg-gray-100 p-0 h-11 rounded-full"
                  />
                </AlertDialogCancel>
              </div>
              {title || description ? (
                <AlertDialogHeader className="space-y-1">
                  {title ? (
                    <AlertDialogTitle className="text-gray-900 font-semibold text-lg">
                      {title}
                    </AlertDialogTitle>
                  ) : null}

                  {description ? (
                    <AlertDialogDescription className="text-gray-600 text-sm">
                      {description}
                    </AlertDialogDescription>
                  ) : null}
                </AlertDialogHeader>
              ) : null}
            </div>
            {children ? <div className="mt-2">{children}</div> : null}
          </div>

          {separator ?? null}

          <AlertDialogFooter className={cn('grid grid-cols-2 gap-x-2 p-6 pt-0', footerClassName)}>
            {cancelButtonText ? (
              <AlertDialogCancel
                className="w-full text-gray-700 font-semibold h-12 mt-0"
                onClick={handleCancel}
              >
                {cancelButtonText}
              </AlertDialogCancel>
            ) : null}
            {action ?? null}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogContext.Provider>
    </AlertDialog>
  );
}
