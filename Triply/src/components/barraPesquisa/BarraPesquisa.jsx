import React, { useRef } from 'react';
import { Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './BarraPesquisaStyle';

export default function BarraPesquisa({
  value,
  onChangeText,
  placeholder = 'Quer ir para onde?',
}) {
  const inputRef = useRef(null);

  function selecionarBarra() {
    inputRef.current?.focus();
  }

  return (
    <Pressable style={styles.container} onPress={selecionarBarra}>
      <Ionicons
        name="search"
        size={18}
        color="#FD7509"
        style={styles.icon}
      />

      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        clearButtonMode="never"
      />
    </Pressable>
  );
}