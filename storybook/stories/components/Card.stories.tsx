import React from 'react';
import { Card, CardProps, Text } from '@react-native-cask-ui/core';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Components/Legacy/Card',
  component: Card,
  argTypes: {
    variant: {},
  },
  args: {
    children: (
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </Text>
    ),
  },
} as Meta;

const Template: Story<CardProps> = args => <Card {...args} />;

export const Basic = Template.bind({});
Basic.storyName = 'Basic';
Basic.args = {};
