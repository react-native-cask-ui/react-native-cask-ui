import React from 'react';
import { View } from 'react-native';
import { Flex, FlexProps } from '@react-native-cask-ui/core';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Layouts/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    padding: 16,
    backgroundColor: '#eee',
    children: (
      <>
        <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
        <View style={{ width: 100, height: 100, backgroundColor: 'green' }} />
        <View style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
      </>
    ),
  },
} as Meta;

const Template: Story<FlexProps> = args => (
  <View style={{ width: '100%', height: 500 }}>
    <Flex {...args} />
  </View>
);

export const Column = Template.bind({});
Column.storyName = 'Column';
Column.args = {};

export const Row = Template.bind({});
Row.storyName = 'Row';
Row.args = {
  row: true,
};

export const Fill = Template.bind({});
Fill.storyName = 'Fill';
Fill.args = {
  row: true,
  fill: true,
};

export const Center = Template.bind({});
Center.storyName = 'Center';
Center.args = {
  row: true,
  width: 500,
  height: 300,
  vCenter: true,
  hCenter: true,
};

export const Between = Template.bind({});
Between.storyName = 'Between';
Between.args = {
  row: true,
  between: true,
};

export const Around = Template.bind({});
Around.storyName = 'Around';
Around.args = {
  row: true,
  around: true,
};
