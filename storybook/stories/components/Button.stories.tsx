import React from 'react';
import { Button, ButtonProps } from '@react-native-cask-ui/core';
import { Story, Meta } from '@storybook/react';
import Feather from '@expo/vector-icons/Feather';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {},
    icon: { control: { disable: true } },
  },
  args: {
    title: 'Click Me',
  },
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Basic = Template.bind({});
Basic.storyName = 'Basic';
Basic.args = {};

export const Icon = Template.bind({});
Icon.storyName = 'Basic with Icon';
Icon.args = {
  icon: <Feather name="search" size={18} color="white" />,
};

export const Disabled = Template.bind({});
Disabled.storyName = 'Disabled';
Disabled.args = {
  disabled: true,
};

export const Outline = Template.bind({});
Outline.storyName = 'Variant - Outline';
Outline.args = {
  variant: 'outline',
};

export const Rounded = Template.bind({});
Rounded.storyName = 'Variant - Rounded';
Rounded.args = {
  variant: 'rounded',
};
