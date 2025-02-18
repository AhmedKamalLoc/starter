import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Core/Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array of tab objects with value, label, and content',
      table: {
        type: {
          summary: 'Tab[]',
          detail: `{
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
}`,
        },
      },
    },
    listClassName: {
      control: 'text',
      description: 'Custom class for the TabsList',
    },
    triggerClassName: {
      control: 'text',
      description: 'Custom class for the TabsTrigger',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: [
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
      {
        value: 'tab3',
        label: 'Tab 3',
        content: <div>Content for Tab 3</div>,
      },
    ],
  },
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const WithCustomStyles: Story = {
  args: {
    tabs: [
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
    ],
    listClassName: 'bg-gray-100 rounded-lg',
    triggerClassName: 'data-[state=active]:bg-blue-500 data-[state=active]:text-white',
  },
};

export const FullwidthTabs: Story = {
  args: {
    tabs: [
      {
        value: 'tab1',
        label: 'My details',
        content: <div>Content for Tab 1</div>,
      },
      {
        value: 'tab2',
        label: 'Security',
        content: <div>Content for Tab 2</div>,
      },
    ],
    listClassName: 'w-full',
    triggerClassName: 'w-full',
    className: 'w-[500px]',
  },
};

export const WithDirectionRTL: Story = {
  args: {
    ...FullwidthTabs.args,
    triggerClassName: 'w-auto',
    listClassName: 'w-full justify-start',
    className: 'w-[500px]',
    dir: 'rtl',
  },
};
