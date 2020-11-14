import React from 'react';
import { Image, ImageProps } from '@react-native-cask-ui/core';
import { Story, Meta } from '@storybook/react';

import TaipeiImage from '../assets/img_taipei.jpg';

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
  source: TaipeiImage,
};

export const RemoteWithLoader = Template.bind({});
RemoteWithLoader.storyName = 'Remote with Loader';
RemoteWithLoader.args = {
  source: {
    uri: 'https://images.unsplash.com/photo-1560134356-feb6bb393b31',
  },
};

export const RemoteWithSpinner = Template.bind({});
RemoteWithSpinner.storyName = 'Remote with Spinner';
RemoteWithSpinner.args = {
  source: {
    uri: 'https://images.unsplash.com/photo-1529850058487-4ce6aa397340',
  },
  placeholderType: 'spinner',
};
