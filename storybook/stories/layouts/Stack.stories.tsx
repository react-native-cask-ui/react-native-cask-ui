import React from 'react';
import { View } from 'react-native';
import { Stack, StackProps } from '@react-native-cask-ui/core';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Layouts/Stack',
  component: Stack,
  argTypes: {},
  args: {
    spacing: 20,
    children: [
      <View style={{ flex: 1, backgroundColor: 'red' }} />,
      <View style={{ flex: 1, backgroundColor: 'green' }} />,
      <View style={{ flex: 1, backgroundColor: 'blue' }} />,
    ],
  },
} as Meta;

const TemplateColumn: Story<StackProps> = args => (
  <View style={{ width: '100%', height: 500 }}>
    <Stack {...args} />
  </View>
);

const TemplateRow: Story<StackProps> = args => (
  <View style={{ width: '100%', height: 500, flexDirection: 'row' }}>
    <Stack {...args} />
  </View>
);

export const ColumnWithSpacing = TemplateColumn.bind({});
ColumnWithSpacing.storyName = 'Column with Spacing';
ColumnWithSpacing.args = {
  children: [
    <View style={{ height: 100, backgroundColor: 'red' }} />,
    <View style={{ height: 100, backgroundColor: 'green' }} />,
    <View style={{ height: 100, backgroundColor: 'blue' }} />,
  ],
};

export const RowWithSpacing = TemplateRow.bind({});
RowWithSpacing.storyName = 'Row with Spacing';
RowWithSpacing.args = {
  row: true,
  children: [
    <View style={{ width: 100, backgroundColor: 'red' }} />,
    <View style={{ width: 100, backgroundColor: 'green' }} />,
    <View style={{ width: 100, backgroundColor: 'blue' }} />,
  ],
};

export const ColumnWithFlexes = TemplateColumn.bind({});
ColumnWithFlexes.storyName = 'Column with Flexes';
ColumnWithFlexes.args = {
  fill: true,
  flexes: [1, 2, 3],
};

export const RowWithSameFlexes = TemplateRow.bind({});
RowWithSameFlexes.storyName = 'Row with Flexes';
RowWithSameFlexes.args = {
  row: true,
  fill: true,
  flexes: [1, 2, 3],
};
