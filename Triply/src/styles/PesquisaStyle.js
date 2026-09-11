import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  section: {
    marginTop: 12,
    width: '100%',
  },
  list: {
    marginTop: 6,
    width: '100%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 6,
  },
  iconWrap: {
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  itemText: {
    color: '#4B4B4B',
    fontSize: 13,
    lineHeight: 18,
    flexShrink: 1,
  },
  seeMoreButton: {
    alignSelf: 'center',
    marginTop: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  seeMoreText: {
    fontSize: 12,
    color: '#4B4B4B',
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E7E7E7',
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#2F2F2F',
    marginTop: 8,
    marginBottom: 6,
    fontWeight: '600',
  },
});
