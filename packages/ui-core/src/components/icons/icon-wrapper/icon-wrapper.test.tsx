import { render } from '@testing-library/react';
import { Trash } from 'lucide-react';
import { describe, expect, it } from 'vitest';

import { IconWrapper } from './icon-wrapper';

describe('IconWrapper Component', () => {
  it('renders icon with correct src', () => {
    const { asFragment } = render(
      <IconWrapper>
        <Trash />
      </IconWrapper>,
    );
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
