import { Meta, Story } from '@storybook/react';

import Table, { TableProps } from './Table';

const meta: Meta = {
  title: 'Components/Elements/Table',
  component: Table,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<TableProps<any>> = (args) => <Table {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  headers: ['Name', 'Age', 'Address'],
  data: [
    { name: 'John Doe', age: 29, address: '123 Main St.' },
    { name: 'Jane Smith', age: 24, address: '456 Elm St.' },
  ],
  keyExtractor: (item, index) => item.name + index,
  rowRenderer: (item) => [item.name, item.age.toString(), item.address],
  onRowClick: (item) => alert(`${item.name} clicked!`),
};
