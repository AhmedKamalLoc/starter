import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Tabs } from './tabs';

describe('Tabs Component', () => {
  const tabs = [
    {
      value: 'tab1',
      label: 'Tab 1',
      content: <div>Content for Tab 1</div>,
    },
    {
      value: 'tab2',
      label: 'Tab 2',
      content: <div>Content for Tab 2</div>,
    },
  ];

  it('renders the tabs with default active tab', () => {
    render(<Tabs tabs={tabs} />);

    // Check if the first tab is active by default
    expect(screen.getByText('Tab 1')).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
  });

  it('switches to the second tab when clicked', async () => {
    render(<Tabs tabs={tabs} />);

    // Click the second tab
    await userEvent.click(screen.getByText('Tab 2'));

    // Check if the second tab is active
    expect(screen.getByText('Tab 2')).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
  });

  it('applies custom class names to TabsList and TabsTrigger', () => {
    render(<Tabs tabs={tabs} listClassName="custom-list" triggerClassName="custom-trigger" />);

    // Check if custom classes are applied
    expect(screen.getByRole('tablist')).toHaveClass('custom-list');
    expect(screen.getByText('Tab 1')).toHaveClass('custom-trigger');
  });

  it('renders fullwidth tabs when className is set to w-full', () => {
    render(<Tabs tabs={tabs} className="w-full" />);

    // Check if the Tabs component has the full width class
    expect(screen.getByRole('tablist').parentElement).toHaveClass('w-full');
  });

  it('renders vertical tabs when orientation is set to vertical', () => {
    render(<Tabs tabs={tabs} orientation="vertical" />);

    // Check if the TabsList has the vertical orientation class
    expect(screen.getByRole('tablist')).toHaveClass(
      'bg-muted text-muted-foreground inline-flex h-9 w-full items-center justify-start rounded-md border border-border',
    );
  });
});
