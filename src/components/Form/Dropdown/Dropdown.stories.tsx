import { Meta, Story } from '@storybook/react';

import Dropdown, { DropdownProps } from './Dropdown';

const meta: Meta = {
  title: 'Components/Elements/Dropdown',
  component: Dropdown,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});

Default.args = {
  selectedOption: 'Option 1',
  options: ['Option 1', 'Option 2', 'Option 3'],
  onChange: (value) => alert(`Selected ${value}`),
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  size: 'sm',
};

export const Medium = Template.bind({});
Medium.args = {
  ...Default.args,
  size: 'md',
};

export const Large = Template.bind({});
Large.args = {
  ...Default.args,
  size: 'lg',
};

export const Full = Template.bind({});
Full.args = {
  ...Default.args,
  size: 'full',
};
