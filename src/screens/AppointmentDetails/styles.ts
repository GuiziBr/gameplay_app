import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  banner: {
    width: '100%',
    height: 234
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading
  },
  subtitle: {
    fontSize: 13,
    fontFamily: theme.fonts.text400,
    color: theme.colors.heading,
    lineHeight: 21
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    marginTop: 30,
    marginBottom: 20
  },
  members: {
    marginLeft: 24,
    marginTop: 27
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  }
})