import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumb } from './breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Core/Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};

export default meta;

const BasicTemplate: StoryObj<typeof Breadcrumb> = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Documents', href: '#' },
      { label: 'Current Page' },
    ],
    ellipsisThreshold: 3,
  },
  argTypes: {
    separator: { control: 'text' },
    ellipsisThreshold: { control: 'number' },
    items: {
      control: {
        type: 'object',
        labels: {
          label: 'Text',
          href: 'URL (optional)',
        },
      },
    },
  },
};

export const Default: StoryObj<typeof Breadcrumb> = { ...BasicTemplate };
export const WithCustomSeparator: StoryObj<typeof Breadcrumb> = {
  ...BasicTemplate,
  args: {
    ...BasicTemplate.args,
    separator: '>',
  },
};
