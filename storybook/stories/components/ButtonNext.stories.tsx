import React from 'react';
import { StyleSheet } from 'react-native';
import { ButtonNext as Button, ButtonNextProps as ButtonProps } from '@react-native-cask-ui/core';
import { Story, Meta } from '@storybook/react';
import Feather from 'react-native-vector-icons/Feather';

export default {
  title: 'Components/Next/Button',
  component: Button,
  argTypes: {
    variant: {},
    icon: { control: { disable: true } },
  },
  args: {},
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Basic = Template.bind({});
Basic.storyName = 'Basic';
Basic.args = {
  title: 'Text',
};

export const ButtonWithIcon = Template.bind({});
ButtonWithIcon.storyName = 'Icon With Text';
ButtonWithIcon.args = {
  title: 'Text',
  icon: <Feather name="search" size={18} color="white" />,
};

export const IconButton = Template.bind({});
IconButton.storyName = 'Pure Icon';
IconButton.args = {
  icon: <Feather name="search" size={22} color="white" />,
  size: 'large',
  variant: 'rounded',
};

export const Disabled = Template.bind({});
Disabled.storyName = 'Disabled';
Disabled.args = {
  title: 'Text',
  disabled: true,
};

export const Outline = Template.bind({});
Outline.storyName = 'Variant - Outline';
Outline.args = {
  title: 'Text',
  variant: 'outline',
};

export const Rounded = Template.bind({});
Rounded.storyName = 'Variant - Rounded';
Rounded.args = {
  title: 'Text',
  variant: 'rounded',
};

export const CustomizeStyle = Template.bind({});
CustomizeStyle.storyName = 'SX - Customize Style';
CustomizeStyle.args = {
  title: 'Text',
  sx: StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    button: {
      backgroundColor: '#F4511E',
    },
  }),
};
