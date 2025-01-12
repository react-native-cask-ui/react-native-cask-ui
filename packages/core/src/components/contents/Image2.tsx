import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, ImageProps } from 'expo-image';

import { useOverride } from '@react-native-cask-ui/theme';

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

export type TImageProps = ImageProps & {
  ImageRenderer?: ReactNode;
  variant?: string;
  fill?: boolean;
  width?: number;
  height?: number;
};

export default React.memo<TImageProps>(props => {
  const { props: overridedProps, styles } = useOverride<TImageProps>('Image', props);
  const { source, fill, width, height, ...otherProps } = overridedProps;

  // render
  const finalStyle = [defaultStyles.root, styles.root];
  const finalImageStyle = [defaultStyles.image, styles.image];

  const wrapperStyle = {
    flex: fill ? 1 : undefined,
    width,
    height,
  };

  return (
    <View style={[finalStyle, wrapperStyle]}>
      <Image
        // @ts-ignore
        style={finalImageStyle}
        source={source}
        {...otherProps}
      />
    </View>
  );
});
