import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Button } from '@/components/button/button';

import { ActionDialog } from './action-dialog';

describe('ActionDialog', () => {
  const mockTitle = 'Test Dialog';
  const mockDescription = 'Test description';
  const mockAction = <Button>Confirm</Button>;
  const mockTrigger = <Button>Open Dialog</Button>;

  afterEach(cleanup);

  it('renders closed by default', () => {
    render(
      <ActionDialog
        title={mockTitle}
        description={mockDescription}
        action={mockAction}
        trigger={mockTrigger}
      >
        <div>Child content</div>
      </ActionDialog>,
    );

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('opens when trigger is clicked', async () => {
    render(
      <ActionDialog
        title={mockTitle}
        description={mockDescription}
        action={mockAction}
        trigger={mockTrigger}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Open Dialog' }));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('displays correct title and description', () => {
    render(
      <ActionDialog title={mockTitle} description={mockDescription} action={mockAction} isOpen />,
    );

    expect(screen.getAllByText(mockTitle)[0]).toBeInTheDocument();
    expect(screen.getAllByText(mockDescription)[0]).toBeInTheDocument();
  });

  it('calls onCancel when close button is clicked', async () => {
    const handleCancel = vi.fn();

    render(
      <ActionDialog
        title={mockTitle}
        description={mockDescription}
        action={mockAction}
        isOpen
        onCancel={handleCancel}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(handleCancel).toHaveBeenCalled();
  });

  it('closes when cancel button is clicked', async () => {
    const { rerender } = render(
      <ActionDialog
        title={mockTitle}
        description={mockDescription}
        action={mockAction}
        isOpen
        cancelButtonText="Custom Cancel"
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Custom Cancel' }));

    rerender(
      <ActionDialog
        title={mockTitle}
        description={mockDescription}
        action={mockAction}
        isOpen={false}
      />,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders custom background image', () => {
    render(
      <ActionDialog title={mockTitle} description={mockDescription} action={mockAction} isOpen />,
    );

    const backgroundDiv = screen.getByTestId('dialog-background');

    expect(backgroundDiv).toHaveClass('bg-[url(/icons/trash-bg.svg)]');
  });

  it('renders custom props correctly', () => {
    render(
      <ActionDialog
        title={mockTitle}
        description={mockDescription}
        action={mockAction}
        isOpen
        icon={<div data-testid="custom-icon" />}
        separator={<div data-testid="custom-separator" />}
        cancelButtonText="Custom Cancel"
      />,
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.getByTestId('custom-separator')).toBeInTheDocument();
    expect(screen.getByText('Custom Cancel')).toBeInTheDocument();
  });
});
