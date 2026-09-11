import React, { useRef, useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';

import styles from '../styles/PesquisaStyle';

const pesquisasRecentesInicio = [
  { id: 'recent-1', nome: 'Maldivas', icone: 'time-outline' },
  { id: 'recent-2', nome: 'Hawaii', icone: 'time-outline' },
  { id: 'recent-3', nome: 'Dubai', icone: 'time-outline' },
  { id: 'recent-4', nome: 'São Paulo', icone: 'time-outline' },
];

const pesquisasRecentesExtras = [
  { id: 'recent-5', nome: 'Bali', icone: 'time-outline' },
  { id: 'recent-6', nome: 'Paris', icone: 'time-outline' },
];

const sugestoesInicio = [
  {
    id: 'sug-1',
    nome: 'Estados Unidos',
    icone: 'search-outline',
    tipo: 'destino'
  },
  {
    id: 'sug-2',
    nome: 'Estados Unidos',
    icone: 'search-outline',
    tipo: 'destino'
  },
  {
    id: 'sug-3',
    nome: 'Estados Unidos',
    icone: 'search-outline',
    tipo: 'destino'
  },
  {
    id: 'sug-4',
    nome: 'Fidalgo.k2',
    icone: 'person-outline',
    tipo: 'usuario'
  },
];

const sugestoesExtras = [
  {
    id: 'sug-5',
    nome: 'Japão',
    icone: 'search-outline',
    tipo: 'destino'
  },
  {
    id: 'sug-6',
    nome: 'Tailândia',
    icone: 'search-outline',
    tipo: 'destino'
  },
];

const pesquisasPopulares = [
  {
    id: 'pop-1',
    nome: 'Fidalgo.k2',
    icone: 'person-outline'
  },
  {
    id: 'pop-2',
    nome: 'São Paulo',
    icone: 'time-outline'
  },
  {
    id: 'pop-3',
    nome: 'São Paulo',
    icone: 'time-outline'
  },
  {
    id: 'pop-4',
    nome: 'São Paulo',
    icone: 'time-outline'
  },
];

const popularCardColors = [
  'rgba(243, 165, 92, 0.74)',
  'rgba(245, 197, 147, 0.46)',
  'rgba(255, 224, 190, 0.26)',
  'rgba(255, 255, 255, 0)',
];

export default function Pesquisa() {
  const navigation = useNavigation();
  const [pesquisa, setPesquisa] = useState('');
  const [mostrarMaisRecentes, setMostrarMaisRecentes] = useState(false);
  const [mostrarMaisSugestoes, setMostrarMaisSugestoes] = useState(false);
  const [recentes, setRecentes] = useState(pesquisasRecentesInicio);
  const pressAnimations = useRef({});

  const handleGoBack = () => {
    router.navigate("/(tabs)");
  };

  const listaRecentes = mostrarMaisRecentes
    ? [...recentes, ...pesquisasRecentesExtras]
    : recentes;

  const listaSugestoes = mostrarMaisSugestoes
    ? [...sugestoesInicio, ...sugestoesExtras]
    : sugestoesInicio;

  const removerRecente = (id) => {
    setRecentes((atual) =>
      atual.filter((item) => item.id !== id)
    );
  };

  const getPressAnimation = (id) => {
    if (!pressAnimations.current[id]) {
      pressAnimations.current[id] = new Animated.Value(0);
    }

    return pressAnimations.current[id];
  };

  const handlePressIn = (id) => {
    const animation = getPressAnimation(id);

    animation.stopAnimation();
    animation.setValue(0);

    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
      Animated.delay(260),
      Animated.timing(animation, {
        toValue: 0,
        duration: 520,
        easing: Easing.in(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    return null;
  };

  const renderRecentItemContent = (item) => {
    const animation = getPressAnimation(item.id);

    const textColor = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#6A6A6A', '#FD7509'],
    });

    const iconBaseOpacity = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    const iconPressedOpacity = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <View style={styles.itemMainContent}>
        <View style={styles.iconWrap}>
          <Animated.View style={{ opacity: iconBaseOpacity }}>
            <Ionicons
              name={item.icone}
              size={16}
              color="#7A7A7A"
            />
          </Animated.View>

          <Animated.View
            style={{
              position: 'absolute',
              opacity: iconPressedOpacity,
            }}
          >
            <Ionicons
              name={item.icone}
              size={16}
              color="#FD7509"
            />
          </Animated.View>
        </View>

        <Animated.Text
          style={[
            styles.recentText,
            { color: textColor }
          ]}
        >
          {item.nome}
        </Animated.Text>
      </View>
    );
  };

  const renderSuggestionItemContent = (item) => {
    const animation = getPressAnimation(item.id);

    const textColor = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#6A6A6A', '#FD7509'],
    });

    const iconBaseOpacity = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    const iconPressedOpacity = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    if (item.tipo === 'usuario') {
      return (
        <View style={styles.userSuggestionContent}>
          <View style={styles.iconWrap}>
            <Animated.View
              style={{ opacity: iconBaseOpacity }}
            >
              <Ionicons
                name="person-outline"
                size={16}
                color="#7A7A7A"
              />
            </Animated.View>

            <Animated.View
              style={{
                position: 'absolute',
                opacity: iconPressedOpacity,
              }}
            >
              <Ionicons
                name="person-outline"
                size={16}
                color="#FD7509"
              />
            </Animated.View>
          </View>

          <Animated.Text
            style={[
              styles.suggestionText,
              { color: textColor }
            ]}
          >
            {item.nome}
          </Animated.Text>
        </View>
      );
    }

    return (
      <View style={styles.itemMainContent}>
        <View style={styles.iconWrap}>
          <Animated.View
            style={{ opacity: iconBaseOpacity }}
          >
            <Ionicons
              name={item.icone}
              size={16}
              color="#7A7A7A"
            />
          </Animated.View>

          <Animated.View
            style={{
              position: 'absolute',
              opacity: iconPressedOpacity,
            }}
          >
            <Ionicons
              name={item.icone}
              size={16}
              color="#FD7509"
            />
          </Animated.View>
        </View>

        <Animated.Text
          style={[
            styles.suggestionText,
            { color: textColor }
          ]}
        >
          {item.nome}
        </Animated.Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <Pressable
            onPress={handleGoBack}
            style={styles.backButton}
            hitSlop={10}
            android_ripple={null}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color="#FD7509"
            />
          </Pressable>

          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={18}
              color="#FD7509"
              style={styles.searchIcon}
            />

            <TextInput
              value={pesquisa}
              onChangeText={setPesquisa}
              placeholder="Quer ir para onde?"
              placeholderTextColor="#9E9E9E"
              style={styles.searchInput}
              returnKeyType="search"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.recentList}>
            {listaRecentes.map((item) => (
              <Pressable
                key={item.id}
                style={styles.recentItem}
                onPressIn={() => handlePressIn(item.id)}
                onPressOut={handlePressOut}
                android_ripple={null}
              >
                {renderRecentItemContent(item)}

                <Pressable
                  onPress={() => removerRecente(item.id)}
                  hitSlop={8}
                  style={styles.removeButton}
                  onPressIn={(event) =>
                    event.stopPropagation()
                  }
                  android_ripple={null}
                >
                  <Ionicons
                    name="close-outline"
                    size={18}
                    color="#7A7A7A"
                  />
                </Pressable>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={styles.seeMoreButton}
            onPress={() =>
              setMostrarMaisRecentes((atual) => !atual)
            }
          >
            <Text style={styles.seeMoreText}>
              Veja Mais ˅
            </Text>
          </Pressable>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Você pode gostar
            </Text>

            <View style={styles.refreshWrap}>
              <Ionicons
                name="refresh"
                size={14}
                color="#6B7280"
              />

              <Text style={styles.refreshText}>
                Atualizar
              </Text>
            </View>
          </View>

          <View style={styles.suggestionList}>
            {listaSugestoes.map((item) => (
              <Pressable
                key={item.id}
                style={
                  item.tipo === 'usuario'
                    ? styles.userSuggestion
                    : styles.suggestionItem
                }
                onPressIn={() => handlePressIn(item.id)}
                onPressOut={handlePressOut}
                android_ripple={null}
              >
                {renderSuggestionItemContent(item)}
              </Pressable>
            ))}
          </View>

          <Pressable
            style={styles.seeMoreButton}
            onPress={() =>
              setMostrarMaisSugestoes((atual) => !atual)
            }
          >
            <Text style={styles.seeMoreText}>
              Veja Mais ˅
            </Text>
          </Pressable>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.popularTitle}>
            Pesquisas populares ↗
          </Text>

          <View style={styles.popularList}>
            {pesquisasPopulares.map((item, index) => (
              <View
                key={item.id}
                style={styles.popularItemWrapper}
              >
                <View
                  style={[
                    styles.popularItem,
                    {
                      backgroundColor:
                        popularCardColors[index],
                    },
                  ]}
                >
                  <Ionicons
                    name={item.icone}
                    size={15}
                    color="#7A7A7A"
                    style={styles.popularIcon}
                  />

                  <Text style={styles.popularText}>
                    {item.nome}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}