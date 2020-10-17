import React from 'react';
import { Image, ImageProps } from '@react-native-cask-ui/core';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Components/Image',
  component: Image,
  argTypes: {
    variant: {},
  },
  args: {
    width: 400,
    height: 300,
  },
} as Meta;

const Template: Story<ImageProps> = args => <Image {...args} />;

export const Basic = Template.bind({});
Basic.storyName = 'Basic';
Basic.args = {
  source: {
    uri: 'https://images.unsplash.com/photo-1560134356-feb6bb393b31',
  },
};
