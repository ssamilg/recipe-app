import { StyleSheet } from 'react-native';
import { AppStyles } from '~/config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    padding: 8,
  },
  flex: { flex: 1 },
  cardWrapper: { flexShrink: 1, width: '100%' },
  cardHeaderImage: {
    height: 160,
    width: '100%',
    resizeMode: 'contain',
    marginTop: -75,
  },
  errorText: { color: AppStyles.colors.error },
});

export default styles;
