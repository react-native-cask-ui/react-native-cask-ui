import React, { ReactElement, ReactNode, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  FlatList,
  SectionListData,
  SectionListRenderItem,
  ListRenderItem,
} from 'react-native';
import DraggableFlatList, { OnMoveEndInfo } from 'react-native-draggable-flatlist';

import { useOverride, TStyle } from '../theme';

const defaultStyles = StyleSheet.create({
  groupedHeaderText: {
    paddingTop: 28,
    paddingHorizontal: 12,
    paddingBottom: 8,
    fontSize: 15,
    lineHeight: 20,
  },
  groupedFooterText: {
    paddingTop: 8,
    paddingHorizontal: 12,
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
  itemSeparatorInset: {},
});

export type TSectionData =
  | SectionListData<unknown>
  | {
      headerTitle?: string;
      headerView?: ReactNode;
      footerTitle?: string;
      footerView?: ReactNode;
      data: unknown[];
      tag?: string;
    };

export type TListProps = {
  variant?: string;
  sectionType: 'plain' | 'grouped';
  draggable?: boolean;
  renderSectionHeader?: (
    info: { section: SectionListData<unknown> },
    sectionHeader: ReactElement,
  ) => ReactElement | null;
  renderSectionFooter?: (
    info: { section: SectionListData<unknown> },
    sectionFooter: ReactElement,
  ) => ReactElement | null;
  renderItem: SectionListRenderItem<unknown> | ListRenderItem<unknown>;
  keyExtractor: (item: any, index: number) => string;
  extraData?: unknown;
  initialScrollIndex?: number;
  ListEmptyComponent?: ReactNode | null;
  sections?: (TSectionData | null)[] | null;
  data?: unknown[] | null;
  contentContainerStyle?: TStyle;
  scrollEnabled?: boolean;
  // draggable
  scrollPercent?: number;
  onMoveEnd?: (info: OnMoveEndInfo<unknown>) => void;
  onMoveBegin?: (index: number) => void;
};

const List = React.memo<TListProps>(
  React.forwardRef((props, ref) => {
    const { props: overridedProps, styles } = useOverride<TListProps>('List', props);
    const {
      contentContainerStyle,
      sectionType,
      draggable,
      sections,
      data,
      renderSectionHeader: originRenderSectionHeader,
      renderSectionFooter: originRenderSectionFooter,
      ...otherProps
    } = overridedProps;

    const renderSectionHeader = useCallback(
      ({ section }: { section: TSectionData }) => {
        if (section.headerView) return section.headerView;

        const finalGroupedHeaderTextStyle = [defaultStyles.groupedHeaderText, styles.groupedHeaderText];
        const finalPlainHeaderTextStyle = [defaultStyles.plainHeaderText, styles.plainHeaderText];
        const finalSectionSeparatorStyle = [defaultStyles.sectionSeparator, styles.sectionSeparator];

        let sectionHeader = <View style={{ height: 32 }} />;

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
            <View style={{ marginTop: -1 }}>
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
      ({ section }: { section: TSectionData }) => {
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
          {...otherProps}
          /* @ts-ignore */
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
          {...otherProps}
          ref={ref}
        />
      );
    }

    return null;
  }),
);

/* @ts-ignore */
List.defaultProps = {
  disabled: false,
  itemType: 'default',
  accessoryType: 'none',
  allowsSelection: true,
  sectionType: 'plain',
};

export default List;
