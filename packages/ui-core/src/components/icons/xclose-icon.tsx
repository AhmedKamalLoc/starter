import * as React from 'react';

type XCloseIconProps = {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
} & React.SVGProps<SVGSVGElement>;

export function XCloseIcon({
  className,
  size = 24,
  color = '#98A2B3',
  strokeWidth = 2,
  ...props
}: Readonly<XCloseIconProps>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

XCloseIcon.displayName = 'XCloseIcon';
