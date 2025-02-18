import type { Meta, StoryObj } from '@storybook/react';
import { CheckCheck } from 'lucide-react';

import { Button } from '@/components/button/button';

import { ActionDialog } from './action-dialog';

const meta: Meta<typeof ActionDialog> = {
  title: 'Core/Components/ActionDialog',
  component: ActionDialog,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
    onCancel: { action: 'onCancel' },
  },
};

export default meta;

type Story = StoryObj<typeof ActionDialog>;

export const Default: Story = {
  args: {
    title: 'Delete Project',
    description: 'Are you sure you want to delete this project? This action cannot be undone.',
    cancelButtonText: 'Cancel',
    action: (
      <Button variant="destructive" size="xl">
        Delete
      </Button>
    ),
    isOpen: false,
    trigger: (
      <Button variant="outline" className="w-full max-w-[200px]">
        Trigger
      </Button>
    ),
  },
};

export const WithCustomContent: Story = {
  args: {
    ...Default.args,
    children: (
      <div className="p-4 bg-gray-50 rounded-lg mt-4">
        <p className="text-sm text-gray-600">Additional content can be added here</p>
      </div>
    ),
    action: <Button size="xl">upgrade</Button>,
  },
};

export const WithCustomIcon: Story = {
  args: {
    ...Default.args,
    icon: <CheckCheck />,
  },
};

export const WithCustomTriggerButton: Story = {
  args: {
    ...Default.args,
    isOpen: false,
    trigger: (
      <Button variant="destructive" className="w-full max-w-[200px]">
        Custom Trigger
      </Button>
    ),
  },
};

export const WithLongContent: Story = {
  args: {
    ...Default.args,
    description:
      'This is a longer description that might wrap to multiple lines. It provides more detailed information about the action that is about to be taken. Please read carefully before proceeding.',
    children: (
      <div className="p-4 bg-gray-50 rounded-lg mt-4 space-y-2">
        <p className="text-sm text-gray-600">Additional details:</p>
        <ul className="text-sm text-gray-600 list-disc pl-4">
          <li>This action will permanently delete the project</li>
          <li>All associated data will be removed</li>
          <li>This cannot be undone</li>
        </ul>
      </div>
    ),
  },
};
