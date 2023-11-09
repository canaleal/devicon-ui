import {  Meta, Story } from '@storybook/react';

import CodeBlock, { CodeBlockProps } from './CodeBlock';

const meta: Meta = {
    title: 'Components/Elements/CodeBlock',
    component: CodeBlock,
    parameters: {
        controls: { expanded: true },
    },
}

export default meta;

const Template: Story<CodeBlockProps> = (args) => <CodeBlock {...args} />;
export const Default = Template.bind({});

Default.args = {
    code: '<div>Code</div>'
};