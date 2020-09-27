import React from 'react';
import { TextInput, TextInputProps } from '@react-native-cask-ui/core';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Example/TextInput',
  component: TextInput,
  argTypes: {
    variant: {},
  },
  args: {
    placeholder: 'Please enter some text',
  },
} as Meta;

const Template: Story<TextInputProps> = args => <TextInput {...args} />;

export const Basic = Template.bind({});
Basic.storyName = 'Basic';
Basic.args = {};

export const Label = Template.bind({});
Label.storyName = 'Basic with Label';
Label.args = {
  label: 'Your Name',
};

export const Uneditable = Template.bind({});
Uneditable.storyName = 'Uneditable';
Uneditable.args = {
  editable: false,
};

export const Underline = Template.bind({});
Underline.storyName = 'Variant - Underline';
Underline.args = {
  variant: 'underline',
};
