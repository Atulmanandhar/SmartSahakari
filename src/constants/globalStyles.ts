import {StyleSheet, Dimensions} from 'react-native';
import {Colors, Spacing} from '.';

export const GlobalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  marginSpacing: {marginHorizontal: Spacing.hs, marginVertical: Spacing.vs},
  paddingSpacing: {paddingHorizontal: Spacing.hs, paddingVertical: Spacing.vs},
  marginH: {marginHorizontal: Spacing.hs},
  marginV: {marginVertical: Spacing.vs},
  textCenter:{textAlign:"center"}
});
