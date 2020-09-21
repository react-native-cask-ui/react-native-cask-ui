import React, { ReactNode, ReactElement, useCallback, useRef, useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  Dimensions,
  LayoutChangeEvent,
  PanResponder,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import { TabView, TabBar, Pager, SceneRendererProps } from 'react-native-tab-view';

import PagerConfig from './PagerConfig';

import { useOverride } from '../theme';

const defaultStyles = StyleSheet.create({
  indicator: {
    height: 3,
    bottom: 0, // track
  },
  tabBar: {
    height: 40,
    elevation: 0,
    shadowOpacity: 0,
  },
  tab: {
    height: 37,
    minHeight: 37,
    padding: 0,
  },
  tabLabel: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 19,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginBottom: -3, // track
  },
  tabLabelActive: {},
  tabLabelInactive: {},
});

const fixedStyles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

type Route = {
  index: number;
  key: string;
  title?: string;
};

type Props = {
  variant?: string;
  keyExtractor: (index: number) => string;
  titles: Array<string>;
  trackID?: string;
  renderTab?: (index: number, isSelected: boolean, defaultTab: ReactNode) => ReactNode;
  initialPage?: number;
  onPageChange?: (index: number) => void; // triggered at the scrolling stop, but not at the first time mount
  swipeEnabled?: boolean;
  placeholder?: ReactNode;
  renderHeader?: (props: { offset: Animated.Value }) => ReactNode;
  renderStickyHeader?: (props: { offset: Animated.Value }) => ReactNode;
  stickyTabBarOffset?: number;
  lazy?: boolean;

  /*
   * don't dynamically update children because the native Android Pager (ViewPagerAndroid) doesn't support
   * https://github.com/facebook/react-native/issues/14296
   * https://stackoverflow.com/questions/37440798/react-native-viewpagerandroid-using-dynamic-page-views
   */
  children: Array<ReactElement>;
};

export default React.memo<Props>(props => {
  const { props: overridedProps, styles } = useOverride('Pager', props);
  const {
    initialPage = 0.0,
    swipeEnabled = true,
    keyExtractor,
    titles,
    stickyTabBarOffset = 0,
    renderHeader,
    renderStickyHeader,
    renderTab,
    onPageChange,
    trackID,
    children,
  } = overridedProps;

  const pages = useRef<
    {
      pageDidEnter: () => void;
      pageDidLeave: () => void;
    }[]
  >([]);
  const panStartScrollY = useRef(0);
  const scrollViewReachedStart = useRef(false);
  const scrollViewReachedEnd = useRef(false);
  const scrollViewScrollableHeight = useRef(0);
  const scrollYs = useRef<number[]>([]);
  const scrollHeights = useRef<number[]>([]);
  const scrollY = useRef(new Animated.Value(0));
  const scrollMomentumY = useRef(new Animated.Value(0));

  const [scrollViews] = useState(children.map(() => React.createRef<ScrollView>()));
  const [currentIndex, setCurrentIndex] = useState(initialPage);
  const [tabViewHeight, setTabViewHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [tabBarHeight, setTabBarHeight] = useState(0);
  const [collapsibleHeight, setCollapsibleHeight] = useState(0);

  useEffect(() => {
    // create scrollView references
    children.forEach((_, i) => {
      scrollYs.current[i] = 0;
      scrollHeights.current[i] = 0;
    });

    // trigger track at the first time
    if (trackID) PagerConfig.get().track(trackID, keyExtractor(initialPage), initialPage);
  }, []);

  const getScrollView = useCallback((index: number) => {
    // $FlowFixMe
    return scrollViews[index].current;
  }, []);

  const getCurrentScrollY = useCallback(() => {
    return scrollYs.current[currentIndex];
  }, [currentIndex]);

  const scrollToY = useCallback(
    (index: number, params: { y: number; animated?: boolean; dragging?: boolean; released?: boolean } | null) => {
      const scrollView = getScrollView(index);
      const { animated = true, dragging = false, released = false } = params || {};
      let { y } = params || {};

      // TODO: use easing function to calculate rate
      let resistanceRate;
      if (dragging) resistanceRate = 0.25;
      if (released) resistanceRate = 0.01;
      if (y && resistanceRate) {
        if (scrollViewReachedStart.current && getCurrentScrollY() > y) {
          y *= resistanceRate;
        }
        if (scrollViewReachedEnd.current && getCurrentScrollY() < y) {
          const overflowHeight = y - scrollViewScrollableHeight.current;
          y = scrollViewScrollableHeight.current + overflowHeight * resistanceRate;
        }
      }

      if (scrollView?.scrollTo) {
        scrollView.scrollTo({ x: 0, y, animated });
        /* @ts-ignore */
      } else if (scrollView?.scrollToOffset) {
        /* @ts-ignore */
        scrollView.scrollToOffset({ offset: y, animated });
      }
    },
    [getScrollView, getCurrentScrollY],
  );

  const scrollToEnd = useCallback(
    (index: number, params: { animated?: boolean } | null) => {
      const scrollView = getScrollView(index);
      const { animated = true } = params || {};

      // scrollToEnd can only scroll to the last item of list.
      // not the real end includes padding bottom or min height.
      // so replace scrollToEnd by scrollToOffset with calculated end position.
      const scrollHeight = scrollHeights.current[index];
      /* @ts-ignore */
      scrollView.scrollToOffset({ offset: scrollHeight - tabViewHeight, animated });
    },
    [getScrollView, tabViewHeight],
  );

  // bindPage = (page: Object, index: number) => {
  //   pages.current[index] = page;
  //   // trigger first time pageDidEnter
  //   if (initialPage === index) {
  //     const { pageDidEnter } = page;
  //     if (pageDidEnter) pageDidEnter();
  //   }
  // };

  const alignScrollViews = useCallback(
    (y: number) => {
      scrollViews.forEach((_, otherScrollViewIndex) => {
        if (currentIndex !== otherScrollViewIndex) {
          if (y < collapsibleHeight) {
            scrollToY(otherScrollViewIndex, { y: y < 0 ? 0 : y, animated: false });
          } else {
            // collapsed
            const otherScrollViewY = scrollYs.current[otherScrollViewIndex];
            if (otherScrollViewY < collapsibleHeight) {
              scrollToY(otherScrollViewIndex, { y: collapsibleHeight, animated: false });
            }
          }
        }
      });
    },
    [currentIndex, collapsibleHeight, scrollToY],
  );

  const triggerIndexChange = useCallback(
    (index: number) => {
      // stop scrollViews
      if (renderHeader || renderStickyHeader) {
        scrollToY(currentIndex, { y: getCurrentScrollY(), animated: false });
        alignScrollViews(getCurrentScrollY());
      }

      if (index !== currentIndex) {
        // move page
        setCurrentIndex(index);

        // onPageChange event
        if (onPageChange) onPageChange(index);
        // trigger track
        if (trackID) PagerConfig.get().track(trackID, keyExtractor(index), index);
        // withPagerEvents
        if (pages.current[index]) {
          const { pageDidEnter } = pages.current[index];
          if (pageDidEnter) pageDidEnter();
        }
        if (pages.current[currentIndex]) {
          const { pageDidLeave } = pages.current[currentIndex];
          if (pageDidLeave) pageDidLeave();
        }
      }
    },
    [currentIndex, renderHeader, renderStickyHeader, onPageChange, trackID, keyExtractor, scrollToY, alignScrollViews],
  );

  const handleIndexChange = useCallback((index: number) => triggerIndexChange(index), [triggerIndexChange]);

  const handleScrollBeginDrag = useCallback(() => {
    scrollMomentumY.current.stopAnimation();
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<any>, sceneIndex: number) => {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

      scrollYs.current[sceneIndex] = contentOffset.y;
      scrollHeights.current[sceneIndex] = contentSize.height;

      if (sceneIndex !== currentIndex) return;

      // detect scrollView reached start or end
      scrollViewReachedStart.current = contentOffset.y <= 0;
      scrollViewReachedEnd.current = layoutMeasurement.height + contentOffset.y >= contentSize.height;
      scrollViewScrollableHeight.current = contentSize.height - layoutMeasurement.height;
    },
    [currentIndex],
  );

  const handleTabViewLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setTabViewHeight(height);
  }, []);

  const handleHeaderLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      setHeaderHeight(height);
      setCollapsibleHeight(height > stickyTabBarOffset ? height - stickyTabBarOffset : 0);
    },
    [stickyTabBarOffset],
  );

  const handleTabBarLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setTabBarHeight(height);
  }, []);

  // setup panResponder
  const onPanResponderGrant = useCallback(() => {
    panStartScrollY.current = getCurrentScrollY();
    scrollMomentumY.current.stopAnimation();
  }, [getCurrentScrollY]);

  const onPanResponderMove = useCallback(
    (_, { dy }) => {
      const y = panStartScrollY.current - dy;
      scrollToY(currentIndex, { y, animated: false, dragging: true });
    },
    [currentIndex, scrollToY],
  );

  const onPanResponderRelease = useCallback(
    (_, { dy, vy }) => {
      const y = panStartScrollY.current - dy;
      alignScrollViews(y);

      const bounceIfNeeds = () => {
        let result = false;
        if (scrollViewReachedStart.current) {
          scrollToY(currentIndex, { y: 0, animated: true });
          // Animated.spring(scrollMomentumY.current, {
          //   toValue: 0,
          //   tension: 0,
          //   useNativeDriver: true,
          // }).start();
          result = true;
        }
        if (scrollViewReachedEnd.current) {
          scrollToEnd(currentIndex, { animated: true });
          // Animated.spring(scrollMomentumY.current, {
          //   toValue: scrollViewScrollableHeight.current,
          //   tension: 0,
          //   useNativeDriver: true,
          // }).start();
          result = true;
        }

        return result;
      };
      if (!bounceIfNeeds()) {
        scrollMomentumY.current.setValue(getCurrentScrollY());
        Animated.decay(scrollMomentumY.current, {
          velocity: -vy,
          useNativeDriver: true,
        }).start(() => {
          bounceIfNeeds();
          alignScrollViews(getCurrentScrollY());
        });
      }
    },
    [currentIndex, getCurrentScrollY, alignScrollViews, scrollToY, scrollToEnd],
  );

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant,
      onPanResponderMove,
      // onPanResponderMove: Animated.event([
      //   null, { dy: scrollY.current },
      // ]),
      onPanResponderRelease,
    });
  }, [onPanResponderGrant, onPanResponderMove, onPanResponderRelease]);

  // momentum scrolliong listener
  useEffect(() => {
    scrollMomentumY.current.removeAllListeners();
    scrollMomentumY.current.addListener(({ value }) => {
      let shouldStop = false;
      if (value < 0) {
        value = 0;
        shouldStop = true;
      }
      if (value > scrollViewScrollableHeight.current) {
        value = scrollViewScrollableHeight.current;
        shouldStop = true;
      }
      scrollToY(currentIndex, { y: value, animated: false, released: true });
      if (shouldStop) {
        scrollMomentumY.current.stopAnimation();
        alignScrollViews(value);
      }
    });
  }, [currentIndex, scrollToY, alignScrollViews]);

  // if initialPage change, should triggerIndexChange
  const lastInitialPage = useRef(initialPage);
  useEffect(() => {
    if (lastInitialPage.current !== initialPage) {
      requestAnimationFrame(() => {
        triggerIndexChange(initialPage);
      });
    }
  }, [initialPage, triggerIndexChange]);

  const renderLabel = useCallback(
    ({ route }: { route: Route }) => {
      const { index } = route;
      const title = titles[index];

      const isSelected = currentIndex === index;
      const tabLabelStyle = isSelected
        ? [defaultStyles.tabLabelActive, styles.tabLabelActive]
        : [defaultStyles.tabLabelInactive, styles.tabLabelInactive];

      const defaultTab = (
        <Text style={[defaultStyles.tabLabel, styles.tabLabel, tabLabelStyle]} allowFontScaling={false}>
          {title}
        </Text>
      );
      if (renderTab) {
        return renderTab(index, isSelected, defaultTab);
      }
      return defaultTab;
    },
    [currentIndex, titles, renderTab],
  );

  const renderTabBar = useCallback(
    (tabBarProps: SceneRendererProps) => {
      // animation
      const headerOffset = scrollY.current.interpolate({
        inputRange: [0, collapsibleHeight],
        outputRange: [0, -collapsibleHeight],
        extrapolateRight: 'clamp',
      });

      const tabBar = (
        <TabBar
          {...tabBarProps}
          style={[defaultStyles.tabBar, styles.tabBar]}
          indicatorStyle={[defaultStyles.indicator, styles.indicator]}
          tabStyle={[defaultStyles.tab, styles.tab]}
          /* @ts-ignore */
          renderLabel={renderLabel}
          useNativeDriver
        />
      );
      return !renderHeader && !renderStickyHeader ? (
        tabBar
      ) : (
        <>
          {/* @ts-ignore */}
          {renderStickyHeader && renderStickyHeader({ offset: Animated.multiply(headerOffset, -1) })}
          <Animated.View
            style={[fixedStyles.header, { transform: [{ translateY: headerOffset }] }]}
            {...panResponder?.panHandlers}
          >
            <View onLayout={handleHeaderLayout}>
              {/* @ts-ignore */}
              {renderHeader && renderHeader({ offset: Animated.multiply(headerOffset, -1) })}
            </View>
            <View onLayout={handleTabBarLayout}>{tabBar}</View>
          </Animated.View>
        </>
      );
    },
    [
      panResponder,
      collapsibleHeight,
      renderHeader,
      renderStickyHeader,
      renderLabel,
      handleHeaderLayout,
      handleTabBarLayout,
    ],
  );

  const renderPager = useCallback(
    (pagerProps: any) => {
      // if header is not ready, don't display Pager content too soon
      const hidePager = (renderHeader || renderStickyHeader) && !headerHeight;
      return (
        <View style={{ flex: 1, opacity: hidePager ? 0 : 1 }}>
          <Pager {...pagerProps} />
        </View>
      );
    },
    [renderHeader, renderStickyHeader, headerHeight],
  );

  const renderScene = useCallback(
    ({ route, jumpTo }: SceneRendererProps & { route: { index: number; key: string } }) => {
      const { index, key } = route;

      return (
        /* @ts-ignore */
        <View style={fixedStyles.fill} key={key} route={route} jumpTo={jumpTo}>
          {React.cloneElement(children[index], {
            /* @ts-ignore */
            pager: this,
            pageIndex: index,
            ...(!renderHeader && !renderStickyHeader
              ? {}
              : {
                  ref: scrollViews[index],
                  scrollToOverflowEnabled: true,
                  scrollEventThrottle: 1,
                  onScroll: Animated.event([{ nativeEvent: { contentOffset: { y: scrollY.current } } }], {
                    useNativeDriver: true,
                    listener: event => handleScroll(event, index),
                  }),
                  onScrollBeginDrag: handleScrollBeginDrag,
                  scrollIndicatorInsets: {
                    top: headerHeight + tabBarHeight,
                  },
                  contentContainerStyle: {
                    paddingTop: headerHeight + tabBarHeight,
                    minHeight: tabViewHeight + collapsibleHeight,
                  },
                }),
          })}
        </View>
      );
    },
    [
      renderHeader,
      renderStickyHeader,
      children,
      headerHeight,
      tabBarHeight,
      tabViewHeight,
      collapsibleHeight,
      handleScroll,
      handleScrollBeginDrag,
    ],
  );

  const routes = useMemo(
    () =>
      children.map((_, index) => ({
        index,
        key: keyExtractor(index),
        title: titles?.[index],
      })),
    [titles, children],
  );

  const navigationState = useMemo(
    () => ({
      index: currentIndex,
      routes,
    }),
    [currentIndex, routes],
  );

  return (
    <View style={fixedStyles.fill} onLayout={handleTabViewLayout}>
      <TabView
        navigationState={navigationState}
        renderPager={renderPager}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
        initialLayout={initialLayout}
        swipeEnabled={swipeEnabled}
      />
    </View>
  );
});
