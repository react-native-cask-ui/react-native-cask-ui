import React, { useCallback, useState, ReactNode, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageProps,
  LayoutChangeEvent,
  ActivityIndicator,
  ImageSourcePropType,
  ImageURISource,
} from 'react-native';
/* @ts-ignore */
import ContentLoader from 'rn-content-loader';
import { Path } from 'react-native-svg';
// import * as Progress from 'react-native-progress';
import { $Diff } from 'utility-types';

import { useOverride, TColor } from '../theme';

const defaultStyles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

const fixedStyles = StyleSheet.create({
  loadingWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingProgressWrapper: {
    opacity: 0.7,
  },
});

export type TImageProps = $Diff<ImageProps, { source: ImageSourcePropType }> & {
  ImageRenderer?: ReactNode;
  source: ImageSourcePropType;
  variant?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  placeholderWidth?: number;
  placeholderHeight?: number;
  retryable?: boolean;
  placeholderType?: 'loader' | 'spinner' | 'progress';
  loaderPrimaryColor?: TColor;
  loaderSecondaryColor?: TColor;
  progressColor?: TColor;
};

export default React.memo<TImageProps>(props => {
  const { props: overridedProps, styles } = useOverride<TImageProps>('Image', props);
  const {
    ImageRenderer = Image,
    source,
    fill,
    width,
    height,
    placeholderWidth,
    placeholderHeight,
    retryable,
    placeholderType,
    loaderPrimaryColor,
    loaderSecondaryColor,
    // progressColor,
    ...otherProps
  } = overridedProps;

  const [retry, setRetry] = useState(0);
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [realWidth, setRealWidth] = useState<number | undefined>();
  const [realHeight, setRealHeight] = useState<number | undefined>();
  const [wrapperWidth, setWrapperWidth] = useState<number | undefined>();
  const [wrapperHeight, setWrapperHeight] = useState<number | undefined>();

  const handleProgress = useCallback(
    e => {
      if (placeholderType !== 'progress') return;

      const { loaded, total } = e.nativeEvent;
      const newProgress = loaded / total;
      // RN is a bit buggy with these events, sometimes a loaded event and then a few
      // 100% progress – sometimes in an infinite loop. So we just assume 100% progress
      // actually means the image is no longer loading
      if (progress !== 1 && progress !== newProgress) {
        setLoading(newProgress < 1);
        setProgress(newProgress);
      }
    },
    [placeholderType, progress],
  );

  const handleLoad = useCallback(e => {
    const { width: sourceWidth, height: sourceHeight } = e.nativeEvent.source || {};
    setLoading(false);
    setRealWidth(sourceWidth);
    setRealHeight(sourceHeight);
  }, []);

  const handleError = useCallback(() => {
    setLoading(true);
    setWaiting(true);

    if (retry < 30) {
      setTimeout(() => {
        // reload and reset progress
        setRetry(retry + 1);
        setWaiting(false);
        setProgress(0);
      }, 2000);
    }
  }, [retry]);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width: sourceWidth, height: sourceHeight } = event.nativeEvent.layout;
    setWrapperWidth(sourceWidth);
    setWrapperHeight(sourceHeight);
  }, []);

  // render
  const finalStyle = [defaultStyles.root, styles.root];
  const finalImageStyle = [defaultStyles.image, styles.image];

  const wrapperStyle = {
    flex: fill ? 1 : undefined,
    width: width || (height && realWidth && realHeight ? (realWidth / realHeight) * height : null) || placeholderWidth,
    height: height || (width && realHeight && realWidth ? (realHeight / realWidth) * width : null) || placeholderHeight,
  };

  // use different uri to clear cache on Android.
  // cache may cause onError loop infinitely.
  const { uri } = source as ImageURISource;
  const newUriSource = useMemo(() => {
    const clearCache = `clearcache=${Date.now()}`;
    if (uri && retry >= 0) {
      return {
        ...(source as ImageURISource),
        uri: !uri.includes('?') ? `${uri}?${clearCache}` : `${uri}&${clearCache}`,
      };
    }
    return undefined;
  }, [uri, retry]);

  const newSource = uri ? newUriSource : source;

  let newWidth = wrapperWidth || width || placeholderWidth;
  let newHeight = wrapperHeight || height || placeholderHeight;

  // auto calculate width or height
  // if the width or height is zero, image will not be download from source.
  // therefore, must set both placeholderWidth and placeholderHeight if width or height is not set.
  if (realWidth && realHeight) {
    if (width && !height) {
      newHeight = (width / realWidth) * realHeight;
    } else if (!width && height) {
      newWidth = (height / realHeight) * realWidth;
    }
  }

  return (
    <View style={[finalStyle, wrapperStyle]} onLayout={handleLayout}>
      {!waiting && (
        /* @ts-ignore */
        <ImageRenderer
          style={finalImageStyle}
          source={newSource}
          onProgress={handleProgress}
          {...otherProps}
          {...(retryable
            ? {
                onLoad: handleLoad,
                onError: handleError,
              }
            : {})}
        />
      )}
      {loading && (
        <View style={fixedStyles.loadingWrapper}>
          {placeholderType === 'loader' && (
            <ContentLoader
              primaryColor={loaderPrimaryColor || '#f7f7f7'}
              secondaryColor={loaderSecondaryColor || '#e9e9e9'}
              width={newWidth}
              height={newHeight}
            >
              <Path d={`M0 0 h${newWidth || 0} v${newHeight || 0} h-${newWidth || 0}z`} />
              {/*
           because of the following issue:
           https://github.com/react-native-community/react-native-svg/issues/1127
           cannot use Rect and should be replaced by Path temporarily
          <Rect
           x="0"
           y="0"
           width={wrapperWidth || width || placeholderWidth}
           height={wrapperHeight || height || placeholderHeight}
          />
          */}
            </ContentLoader>
          )}
          {placeholderType === 'spinner' && <ActivityIndicator />}
          {placeholderType === 'progress' && (
            <View style={fixedStyles.loadingProgressWrapper}>
              {/* <Progress.Circle color={progressColor} progress={progress} indeterminate={!progress || waiting} /> */}
            </View>
          )}
        </View>
      )}
    </View>
  );
});
