import React, { useRef, useState } from 'react';
import { Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './BarraPesquisaStyle';

export default function BarraPesquisa({
  value,
  onChangeText,
  placeholder = 'Quer ir para onde?',
}) {

  const inputRef = useRef(null);
  const timer = useRef(null);

  const [selecionado, setSelecionado] = useState(false);

  function selecionarBarra() {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setSelecionado(true);
    inputRef.current?.focus();

    timer.current = setTimeout(() => {
      setSelecionado(false);
    }, 3000);
  }

  function quandoFocar() {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setSelecionado(true);

    timer.current = setTimeout(() => {
      setSelecionado(false);
    }, 3000);
  }

  function quandoSair() {
    setSelecionado(false);
  }

  return (
    <Pressable
      style={[
        styles.container,
        selecionado && styles.containerSelected,
      ]}
      onPress={selecionarBarra}
    >
      <Ionicons
        name="search"
        size={18}
        color={selecionado ? '#FD7509' : '#8E8E93'}
        style={styles.icon}
      />

      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          selecionado && styles.inputSelected,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={
          selecionado ? '#FD7509' : '#8E8E93'
        }
        selectionColor="#FD7509"
        onFocus={quandoFocar}
        onBlur={quandoSair}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        clearButtonMode="never"
      />
    </Pressable>
  );
}