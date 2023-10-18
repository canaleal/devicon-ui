import { Meta, Story } from '@storybook/react';

import Tooltip, { TooltipProps } from './Tooltip';

const meta: Meta = {
    title: 'Components/Elements/Tooltip',
    component: Tooltip,
    parameters: {
        controls: { expanded: true },
    },

};

export default meta;

const Template: Story<TooltipProps> = (args) => <Tooltip {...args} />;
export const Default = Template.bind({});

Default.args = {
    children: <button>Hover me</button> ,
    content: 'Tooltip content',
};

export const Top = Template.bind({});
Top.args = {
    ...Default.args,
    position: 'top',
};

export const Bottom = Template.bind({});
Bottom.args = {
    ...Default.args,
    position: 'bottom',
};

export const Left = Template.bind({});
Left.args = {
    ...Default.args,
    position: 'left',
};

export const Right = Template.bind({});
Right.args = {
    ...Default.args,
    position: 'right',
};

