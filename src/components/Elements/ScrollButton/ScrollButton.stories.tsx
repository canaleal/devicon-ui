import { Meta, Story } from '@storybook/react';

import ScrollButton, { ScrollButtonProps } from './ScrollButton';

const meta: Meta = {
  title: 'Components/Elements/ScrollButton',
  component: ScrollButton,
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'ScrollButton is a button that scrolls to the top of the page when clicked.',
      },
    },
  },
};

export default meta;

const Template: Story<ScrollButtonProps> = args => <ScrollButton {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const TopLeft = Template.bind({});
TopLeft.args = {
  position: 'topLeft',
};

export const TopRight = Template.bind({});
TopRight.args = {
  position: 'topRight',
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  position: 'bottomLeft',
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  position: 'bottomRight',
};
