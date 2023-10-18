import { Meta, Story } from '@storybook/react';

import SearchBar, { SearchBarProps } from './SearchBar';
import { JSX } from 'react/jsx-runtime';

const meta: Meta = {
    title: 'Components/Elements/SearchBar',
    component: SearchBar,
    parameters: {
        controls: { expanded: true },
    },
}

export default meta;

const Template: Story<SearchBarProps> = (args: JSX.IntrinsicAttributes & SearchBarProps) => <SearchBar {...args} />;
export const Default = Template.bind({});
Default.args = {
    placeholder: 'Search...',
    onSearch: (value: string) => alert(`Searching for ${value}`)
};

export const Small = Template.bind({});
Small.args = {
    ...Default.args,
    size: 'sm'
};

export const Medium = Template.bind({});
Medium.args = {
    ...Default.args,
    size: 'md'
};

export const Large = Template.bind({});
Large.args = {
    ...Default.args,
    size: 'lg'
};

export const Full = Template.bind({});
Full.args = {
    ...Default.args,
    size: 'full'
};
