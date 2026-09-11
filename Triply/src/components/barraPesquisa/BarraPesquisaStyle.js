import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    height: 44,
    marginTop: 20,
    paddingHorizontal: 12,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 14,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,

    fontSize: 16,
    color: '#333333',

    paddingVertical: 0,

    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',

    outlineWidth: 0,
    outlineStyle: 'none',

    textAlignVertical: 'center',
  },
});