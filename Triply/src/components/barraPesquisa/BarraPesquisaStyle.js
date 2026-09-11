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
  },

  containerSelected: {
    borderColor: '#FD7509',
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

    // Remove o contorno padrão do navegador
    outlineWidth: 0,
    outlineStyle: 'none',

    textAlignVertical: 'center',
  },

  inputSelected: {
    color: '#FD7509',
  },
});