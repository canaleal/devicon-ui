import { Meta, Story } from '@storybook/react'

import TextBar, { TextBarProps } from './TextBar'

const meta: Meta = {
  title: 'Components/Elements/TextBar',
  component: TextBar,
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: Story<TextBarProps> = (args) => <TextBar {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Title',
  texts: ['Text 1', 'Text 2', 'Text 3']
}
