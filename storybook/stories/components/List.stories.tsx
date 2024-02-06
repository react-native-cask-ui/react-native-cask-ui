import React from 'react';
import { View } from 'react-native';
import { List, ListProps, ListItem, AccessoryType } from '@react-native-cask-ui/core';
import { Story, Meta } from '@storybook/react';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `Item ${i}`);
const sections = [1, 2, 3].map(s => ({ headerTitle: `Section ${s}`, data }));

const getAccessoryType = (n: number): AccessoryType | undefined => {
  switch (n % 4) {
    case 0:
      return 'none';
    case 1:
      return 'disclosureIndicator';
    case 2:
      return 'checkmark';
    case 3:
      return 'placeholder';
    default:
      return undefined;
  }
};

export default {
  title: 'Components/Legacy/List',
  component: List,
  argTypes: {
    variant: {},
  },
  args: {
    keyExtractor: (item: { id: string }) => item.id,
    renderItem: ({ item, index }: { item: string; index: number }) => {
      return <ListItem text={item} accessoryType={getAccessoryType(index)} />;
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
