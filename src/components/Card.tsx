import React, {Children, FC} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Spacing} from '../constants';

interface Props {
  style?: ViewStyle | ViewStyle[];
}

const Card: FC<Props> = ({children, style}) => {
  return <View style={[styles.card, {...style}]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    // marginHorizontal: Spacing.hs,
    marginVertical: Spacing.vs,
    // paddingVertical: Spacing.vs,
    // paddingHorizontal: Spacing.hs,
  },
});
