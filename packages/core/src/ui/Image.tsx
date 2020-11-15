import React, { useCallback, useState, ReactNode, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Image as OriginImage,
  ImageProps as OriginImageProps,
  LayoutChangeEvent,
  ActivityIndicator,
  ImageSourcePropType,
  ImageURISource,
} from 'react-native';
import ContentLoader from 'react-content-loader';
import { Path } from 'react-native-svg';
// import * as Progress from 'react-native-progress';
import { useOverride, useMemoStyles, TColor } from '@react-native-cask-ui/theme';
import { $Diff } from 'utility-types';

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

export interface ImageProps extends $Diff<OriginImageProps, { source: ImageSourcePropType }> {
  ImageRenderer?: ReactNode;
  /**
   * The variant to use.
   */
  variant?: string;
  /**
   * The image element or remote url.
   */
  source: ImageSourcePropType;
  /**
   * If `true`, the image size will fill the parent container.
   */
  fill?: boolean;
  /**
   * The width of the image. If `undefined`, the image width will equal to the parent container.
   */
  width?: number;
  /**
   * The height of the image. If `undefined`, the image height will equal to the parent container.
   */
  height?: number;
  /**
   * The default width of the placeholder.
   */
  placeholderWidth?: number;
  /**
   * The default height of the placeholder.
   */
  placeholderHeight?: number;
  /**
   * The type of placeholder.
   */
  placeholderType?: 'loader' | 'spinner' | 'progress';
  /**
   * If `true`, the image will keep trying to load the source.
   */
  retryable?: boolean;
  /**
   * The primary color of the loader type placeholder.
   */
  loaderPrimaryColor?: TColor;
  /**
   * The secondary color of the loader type placeholder.
   */
  loaderSecondaryColor?: TColor;
  /**
   * The color of the progress type placeholder.
   */
  progressColor?: TColor;
}

const Image: React.FC<ImageProps> = React.memo<ImageProps>(props => {
  const { props: overridedProps, styles } = useOverride<ImageProps>('Image', props);
  const {
    ImageRenderer = OriginImage,
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
    onLoad,
    onError,
    ...otherProps
  } = overridedProps;

  const { uri } = source as ImageURISource;
  const loadable = !!uri;

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

  const handleLoad = useCallback(
    e => {
      if (onLoad) onLoad(e);

      const { width: sourceWidth, height: sourceHeight } = e.nativeEvent.source || {};
      setLoading(false);
      setRealWidth(sourceWidth);
      setRealHeight(sourceHeight);
    },
    [onLoad],
  );

  const handleError = useCallback(
    error => {
      if (onError) onError(error);

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
    },
    [onError, retry],
  );

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width: sourceWidth, height: sourceHeight } = event.nativeEvent.layout;
    setWrapperWidth(sourceWidth);
    setWrapperHeight(sourceHeight);
  }, []);

  // render
  const wrapperStyle = useMemo(
    () => ({
      flex: fill ? 1 : undefined,
      width:
        width || (height && realWidth && realHeight ? (realWidth / realHeight) * height : null) || placeholderWidth,
      height:
        height || (width && realHeight && realWidth ? (realHeight / realWidth) * width : null) || placeholderHeight,
    }),
    [fill, width, height, realWidth, realHeight, placeholderWidth, placeholderHeight],
  );
  const finalStyle = useMemoStyles([defaultStyles.root, styles.root, wrapperStyle]);
  const finalImageStyle = useMemoStyles([defaultStyles.image, styles.image]);

  // use different uri to clear cache on Android.
  // cache may cause onError loop infinitely.
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
    <View style={finalStyle} onLayout={handleLayout}>
      {!waiting && (
        /* @ts-ignore */
        <ImageRenderer
          style={finalImageStyle}
          source={newSource}
          onProgress={handleProgress}
          {...otherProps}
          onLoad={handleLoad}
          {...(loadable && retryable
            ? {
                onError: handleError,
              }
            : {})}
        />
      )}
      {loadable && loading && (
        <View style={fixedStyles.loadingWrapper}>
          {placeholderType === 'loader' && (
            <ContentLoader
              foregroundColor={loaderPrimaryColor || '#f7f7f7'}
              backgroundColor={loaderSecondaryColor || '#e9e9e9'}
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

export default Image;
