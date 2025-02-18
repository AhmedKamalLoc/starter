import type { ComponentProps } from 'react';

import { AvatarFallback, AvatarImage, Avatar as ShadcnAvatar } from '@/components/ui/avatar';

type AvatarProps = ComponentProps<typeof ShadcnAvatar> & {
  alt: string;
  src: string;
};

export function Avatar({ alt, src, ...props }: AvatarProps) {
  return (
    <ShadcnAvatar {...props}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{alt.slice(0, 2)}</AvatarFallback>
    </ShadcnAvatar>
  );
}
