import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Small } from './small';

describe('Small Component', () => {
  it('renders children correctly', () => {
    render(<Small>Small Text</Small>);
    expect(screen.getByText('Small Text')).toBeInTheDocument();
  });

  it('applies default styles', () => {
    render(<Small>Small Text</Small>);
    const smallText = screen.getByText('Small Text');
    expect(smallText).toHaveClass('text-sm font-medium leading-none');
  });

  it('merges custom className', () => {
    render(<Small className="custom-class">Small Text</Small>);
    const smallText = screen.getByText('Small Text');
    expect(smallText).toHaveClass('custom-class');
  });
});
