import React from 'react';
import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Modal from 'react-native-modal';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : ExtraDimensions.get('REAL_WINDOW_HEIGHT');
interface Props {
  isVisible: boolean;
  onBackdropPress: () => void;
}

const CustomModal: React.FC<Props> = ({
  isVisible,
  onBackdropPress,
  children,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      animationOutTiming={500}
      useNativeDriverForBackdrop={true}>
      {children}
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({});
