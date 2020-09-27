import React from 'react';
import { Text, TextProps } from '@react-native-cask-ui/core';
import { Story, Meta } from '@storybook/react';

const LONG_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const SHORT_TEXT = 'Lorem ipsum';

export default {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    variant: {},
  },
  args: {
    children: SHORT_TEXT,
  },
} as Meta;

const Template: Story<TextProps> = args => <Text {...args} />;

export const Basic = Template.bind({});
Basic.storyName = 'Basic';
Basic.args = {
  children: LONG_TEXT,
};

export const SingleLine = Template.bind({});
SingleLine.storyName = 'Single Line';
SingleLine.args = {
  numberOfLines: 1,
  children: LONG_TEXT,
};

export const MultipleLines = Template.bind({});
MultipleLines.storyName = 'Multiple Lines';
MultipleLines.args = {
  numberOfLines: 3,
  children: LONG_TEXT,
};

export const H1 = Template.bind({});
H1.storyName = 'Variant - H1';
H1.args = {
  variant: 'h1',
};

export const H2 = Template.bind({});
H2.storyName = 'Variant - H2';
H2.args = {
  variant: 'h2',
};

export const H3 = Template.bind({});
H3.storyName = 'Variant - H3';
H3.args = {
  variant: 'h3',
};

export const Content = Template.bind({});
Content.storyName = 'Variant - Content';
Content.args = {
  variant: 'content',
};

export const Deletion = Template.bind({});
Deletion.storyName = 'Variant - Deletion';
Deletion.args = {
  variant: 'deletion',
};

export const Tip = Template.bind({});
Tip.storyName = 'Variant - Tip';
Tip.args = {
  variant: 'tip',
};
