import React, { ReactElement, ReactNode, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  FlatList,
  SectionListData,
  SectionListRenderItem,
  ListRenderItemInfo as OriginListRenderItemInfo,
  VirtualizedListWithoutRenderItemProps,
} from 'react-native';
import DraggableFlatList, { ScaleDecorator, ShadowDecorator, OpacityDecorator } from 'react-native-draggable-flatlist';
import { useOverride, TStyle } from '@react-native-cask-ui/theme';

const defaultStyles = StyleSheet.create({
  defaultHeaderPlaceholder: {
    height: 32,
  },
  groupedHeaderText: {
    paddingTop: 28,
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: 15,
    lineHeight: 20,
  },
  groupedFooterText: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: 14,
    lineHeight: 19,
  },
  plainHeaderText: {
    paddingTop: 6,
    paddingHorizontal: 16,
    paddingBottom: 6,
    fontSize: 13,
    lineHeight: 18,
  },
  sectionSeparator: {
    height: StyleSheet.hairlineWidth,
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 16,
  },
  itemSeparatorInset: {
    backgroundColor: 'white',
  },
});

export type SectionData<ItemT> =
  | SectionListData<ItemT>
  | {
      headerTitle?: string;
      headerView?: ReactNode;
      footerTitle?: string;
      footerView?: ReactNode;
      data: ItemT[];
      tag?: string;
    }
  | null;

export interface ListRenderItemInfo<ItemT> extends OriginListRenderItemInfo<ItemT> {
  drag: () => void;
}

export type ListRenderItem<ItemT> = (info: ListRenderItemInfo<ItemT>) => React.ReactElement | null;

export interface ListProps<ItemT> extends VirtualizedListWithoutRenderItemProps<ItemT> {
  variant?: string;
  sectionType: 'plain' | 'grouped';
  draggable?: boolean;
  renderSectionHeader?: (info: { section: SectionListData<ItemT> }, sectionHeader: ReactElement) => ReactElement | null;
  renderSectionFooter?: (info: { section: SectionListData<ItemT> }, sectionFooter: ReactElement) => ReactElement | null;
  renderItem: SectionListRenderItem<ItemT> | ListRenderItem<ItemT>;
  keyExtractor: (item: any, index: number) => string;
  extraData?: unknown;
  initialScrollIndex?: number;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  sections?: SectionData<ItemT>[] | null;
  data?: ItemT[] | null;
  contentContainerStyle?: TStyle;
  scrollEnabled?: boolean;
  stickySectionHeadersEnabled?: boolean;
  // draggable
  // scrollPercent?: number; // seems be deprecated on v4
  onMoveBegin?: (index: number) => void;
  onMoveEnd?: (info: { data: ItemT[]; from: number; to: number }) => void;
}

function ListBase<ItemT>(props: ListProps<ItemT> & { ref?: React.Ref<FlatList> }, ref: any) {
  const { props: overridedProps, styles } = useOverride<ListProps<ItemT>>('List', props);
  const {
    contentContainerStyle,
    sectionType = 'plain',
    draggable,
    sections,
    data,
    renderSectionHeader: originRenderSectionHeader,
    renderSectionFooter: originRenderSectionFooter,
    renderItem: originRenderItem,
    ...otherProps
  } = overridedProps;

  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionListData<ItemT> }) => {
      if (section.headerView) return section.headerView;

      const finalDefaultHeaderPlaceholderStyle = [
        defaultStyles.defaultHeaderPlaceholder,
        styles.defaultHeaderPlaceholder,
      ];
      const finalGroupedHeaderTextStyle = [defaultStyles.groupedHeaderText, styles.groupedHeaderText];
      const finalPlainHeaderTextStyle = [defaultStyles.plainHeaderText, styles.plainHeaderText];
      const finalSectionSeparatorStyle = [defaultStyles.sectionSeparator, styles.sectionSeparator];

      let sectionHeader = <View style={finalDefaultHeaderPlaceholderStyle} />;

      if (sectionType === 'grouped' && section.headerTitle) {
        sectionHeader = (
          <View>
            <Text style={finalGroupedHeaderTextStyle}>{section.headerTitle}</Text>
          </View>
        );
      }

      if (sectionType === 'plain') {
        if (!section.headerTitle) {
          sectionHeader = <View style={finalSectionSeparatorStyle} />;
        }
        sectionHeader = (
          <View style={{ marginTop: -2 }}>
            <View style={finalSectionSeparatorStyle} />
            <Text style={finalPlainHeaderTextStyle}>{section.headerTitle}</Text>
            <View style={finalSectionSeparatorStyle} />
          </View>
        );
      }

      return originRenderSectionHeader ? originRenderSectionHeader({ section }, sectionHeader) : sectionHeader;
    },
    [originRenderSectionHeader],
  );

  const renderSectionFooter = useCallback(
    ({ section }: { section: SectionData<ItemT> }) => {
      if (!section) return null;
      if (section.footerView) return section.footerView;

      const finalGroupedFooterTextStyle = [defaultStyles.groupedFooterText, styles.groupedFooterText];

      let sectionFooter = <View style={{ height: 0 }} />;

      if (sectionType === 'grouped' && section.footerTitle) {
        sectionFooter = (
          <View>
            <Text style={finalGroupedFooterTextStyle}>{section.footerTitle}</Text>
          </View>
        );
      }

      return originRenderSectionFooter ? originRenderSectionFooter({ section }, sectionFooter) : sectionFooter;
    },
    [originRenderSectionFooter],
  );

  const renderSectionSeparator = useCallback(() => {
    const finalSectionSeparatorStyle = [defaultStyles.sectionSeparator, styles.sectionSeparator];

    return <View style={finalSectionSeparatorStyle} />;
  }, []);

  const renderItemSeparator = useCallback(() => {
    const finalItemSeparatorStyle = [defaultStyles.itemSeparator, styles.itemSeparator];
    const finalItemSeparatorInsetStyle = [defaultStyles.itemSeparatorInset, styles.itemSeparatorInset];

    return (
      <View style={finalItemSeparatorInsetStyle}>
        <View style={finalItemSeparatorStyle} />
      </View>
    );
  }, []);

  const renderItemForDraggable = useCallback(
    (info: any) => {
      const { index, getIndex } = info as { index: number | undefined; getIndex: () => number | undefined };

      let newIndex = index;
      if (newIndex === undefined) newIndex = getIndex();

      return originRenderItem({ ...info, index: newIndex });
    },
    [originRenderItem],
  );

  // render
  if (sections) {
    // remove empty section or data
    const newSections = sections
      .filter(section => !!section)
      .map(section => {
        const { data: sd, ...others } = section || {};
        return {
          ...others,
          data: (sd || []).filter(d => !!d),
        };
      });

    return (
      <SectionList
        sections={newSections}
        stickySectionHeadersEnabled={sectionType === 'plain'}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        SectionSeparatorComponent={sectionType === 'plain' ? null : renderSectionSeparator}
        ItemSeparatorComponent={renderItemSeparator}
        contentContainerStyle={[
          sectionType === 'grouped'
            ? {
                paddingBottom: 64,
              }
            : {},
          contentContainerStyle,
        ]}
        renderItem={draggable ? renderItemForDraggable : (originRenderItem as SectionListRenderItem<ItemT>)}
        {...otherProps}
        ref={ref}
      />
    );
  }

  if (data) {
    // remove empty data
    const newData = data.filter(d => !!d);
    const FlatListRenderer = draggable ? DraggableFlatList : FlatList;

    return (
      /* @ts-ignore */
      <FlatListRenderer
        data={newData}
        ItemSeparatorComponent={renderItemSeparator}
        contentContainerStyle={contentContainerStyle}
        // @ts-ignore, FIXME
        renderItem={draggable ? renderItemForDraggable : (originRenderItem as ListRenderItem<ItemT>)}
        {...otherProps}
        ref={ref}
      />
    );
  }

  return null;
}

const List = React.memo(React.forwardRef(ListBase)) as typeof ListBase;

export default List;

export {
  ScaleDecorator as ListScaleDecorator,
  ShadowDecorator as ListShadowDecorator,
  OpacityDecorator as ListOpacityDecorator,
};
