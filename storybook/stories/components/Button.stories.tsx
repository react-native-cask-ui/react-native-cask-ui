import React from 'react';
import { StyleSheet } from 'react-native';
import { ButtonV2 as Button, ButtonV2Props as ButtonProps } from '@react-native-cask-ui/core';
import { Story, Meta } from '@storybook/react';
import Feather from 'react-native-vector-icons/Feather';

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

export const ButtonWithIcon = Template.bind({});
ButtonWithIcon.storyName = 'Title with Icon';
ButtonWithIcon.args = {
  icon: <Feather name="search" size={18} color="white" />,
};

export const IconButton = Template.bind({});
IconButton.storyName = 'Icon Button';
IconButton.args = {
  icon: <Feather name="search" size={18} color="white" />,
  title: '',
  variant: 'rounded',
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
  sx: StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    button: {
      backgroundColor: '#F4511E',
    },
  }),
};
