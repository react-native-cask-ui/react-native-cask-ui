import React, { ReactNode } from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback, NativeSyntheticEvent } from 'react-native';

import { useOverride } from '../theme';

const defaultStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'white',
    opacity: 0.7,
  },
  modal: {
    width: '90%',
    maxHeight: '70%',
    borderRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'rgb(192, 192, 192)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'visible',
    backgroundColor: 'white',
  },
});

const fixedStyles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  modalWrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export type TModalProps = {
  variant?: string;
  animationType?: 'none' | 'slide' | 'fade';
  transparent?: boolean;
  visible?: boolean;
  onDismiss?: () => void;
  onShow?: (event: NativeSyntheticEvent<unknown>) => void;
  children: (handler: { dismissModal: () => void }) => ReactNode | ReactNode;
};

export default React.memo<TModalProps>(props => {
  const {
    animationType,
    transparent,
    visible = false,
    onDismiss = () => {
      /**/
    },
    children,
  } = props;
  const { styles } = useOverride('Modal', props);

  const finalBackdropStyle = [defaultStyles.backdrop, styles.backdrop];
  const finalModalStyle = [defaultStyles.modal, styles.modal];

  return (
    <Modal visible={visible} animationType={animationType} transparent={transparent} onRequestClose={onDismiss}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={fixedStyles.fill}>
          <View style={finalBackdropStyle} pointerEvents="box-none" />
          <View style={fixedStyles.modalWrapper}>
            <TouchableWithoutFeedback>
              <View style={finalModalStyle}>
                {children && children instanceof Function ? children({ dismissModal: onDismiss }) : children}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});
