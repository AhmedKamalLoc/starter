import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Breadcrumb } from './breadcrumb';

describe('Breadcrumb', () => {
  const mockItems = [
    { label: 'Home', href: '/' },
    { label: 'Documents', href: '/docs' },
    { label: 'Current Page' },
  ];

  it('renders correct number of items', () => {
    render(<Breadcrumb items={mockItems} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('applies custom class names', () => {
    render(<Breadcrumb items={mockItems} className="custom-class" ellipsisThreshold={2} />);
    expect(screen.getByRole('navigation')).toHaveClass('custom-class');
  });

  it('truncates items when exceeding threshold', () => {
    const longList = [...mockItems, { label: 'Extra Page', href: '/extra' }];
    render(<Breadcrumb items={longList} ellipsisThreshold={3} />);
    expect(screen.getByText('More')).toBeInTheDocument();
  });

  it('navigates correctly when clicking links', async () => {
    const user = userEvent.setup();
    render(<Breadcrumb items={mockItems} />);

    const homeLink = screen.getByText('Home');
    await user.click(homeLink);
    expect(globalThis.location.pathname).toBe('/');
  });
});
