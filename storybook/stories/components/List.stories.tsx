import React from 'react';
import { View } from 'react-native';
import { List, ListScaleDecorator, ListProps, ListItem, AccessoryType } from '@react-native-cask-ui/core';
import { Story, Meta } from '@storybook/react';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `Item ${i}`);
const sections = [1, 2, 3].map(s => ({ headerTitle: `Section ${s}`, data }));

const getAccessoryType = (n: number): AccessoryType => {
  const types: AccessoryType[] = ['none', 'disclosureIndicator', 'checkmark', 'placeholder'];
  return types[n % types.length];
};

const getItem = (item: string, accessoryType: AccessoryType, drag?: () => void) => {
  return <ListItem text={item} accessoryType={accessoryType} onLongPress={drag} />;
};

export default {
  title: 'Components/List',
  component: List,
  argTypes: {
    variant: {},
  },
  args: {
    keyExtractor: (item: string) => item,
    renderItem: ({ item }: { item: string }) => {
      return getItem(item, 'disclosureIndicator');
    },
  },
} as Meta;

const Template: Story<ListProps<string>> = args => (
  <View style={{ width: 375, height: 300, backgroundColor: '#F7F7F7', borderWidth: 8, borderColor: '#EEE' }}>
    <List {...args} />
  </View>
);

export const Basic = Template.bind({});
Basic.storyName = 'Basic';
Basic.args = {
  data,
};

export const Accessory = Template.bind({});
Accessory.storyName = 'Accessory';
Accessory.args = {
  data,
  renderItem: ({ item, index }: { item: string; index: number }) => {
    return getItem(item, getAccessoryType(index));
  },
};

export const Draggable = Template.bind({});
Draggable.storyName = 'Draggable';
Draggable.args = {
  data,
  draggable: true,
  renderItem: ({ item, drag }: { item: string; drag: () => void }) => {
    return <ListScaleDecorator>{getItem(item, 'none', drag)}</ListScaleDecorator>;
  },
};

export const SectionPlain = Template.bind({});
SectionPlain.storyName = 'Plain Section';
SectionPlain.args = {
  sections,
};

export const SectionGrouped = Template.bind({});
SectionGrouped.storyName = 'Grouped Section';
SectionGrouped.args = {
  sections,
  sectionType: 'grouped',
};
