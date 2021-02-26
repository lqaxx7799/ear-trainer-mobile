import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  configLayout: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  mainTitle: {
    fontWeight: '600',
    fontSize: 24,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
  buttonBlock: {
    flex: 1,
  },
  inlineButtonGroup: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'center',
  },
});