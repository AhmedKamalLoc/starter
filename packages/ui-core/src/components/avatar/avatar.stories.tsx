import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Core/Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'The source URL of the avatar image',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the avatar image',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the avatar',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

// Default Avatar
export const Default: Story = {
  args: {
    src: 'https://picsum.photos/200',
    alt: 'User Avatar',
  },
};

// Avatar with Fallback
export const Fallback: Story = {
  args: {
    src: '', // Empty src to trigger fallback
    alt: 'John Doe',
  },
};

// Custom Size
export const CustomSize: Story = {
  args: {
    ...Default.args,
    className: 'size-24', // Tailwind classes for custom size
  },
};

// Avatar with Long Name
export const LongNameFallback: Story = {
  args: {
    src: '',
    alt: 'Alexander The Great',
  },
};
