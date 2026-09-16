import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';

import styles from '../styles/PesquisaStyle';
import api from '../service/service.js';

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
  const [recentes, setRecentes] = useState([]);
  const [sugestoes, setSugestoes] = useState([]);
  const [populares, setPopulares] = useState([]);
  const [loading, setLoading] = useState(true);
  const pressAnimations = useRef({});

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [recentesRes, sugestoesRes, popularesRes] = await Promise.all([
        api.get('/pesquisasRecentes'),
        api.get('/sugestoes'),
        api.get('/pesquisasPopulares'),
      ]);

      setRecentes(recentesRes.data);
      setSugestoes(sugestoesRes.data);
      setPopulares(popularesRes.data);
    } catch (err) {
      console.error('Erro ao carregar dados de pesquisa:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else {
      router.push('/');
    }
  };

  const listaRecentes = mostrarMaisRecentes
    ? recentes
    : recentes.slice(0, 4);

  const listaSugestoes = mostrarMaisSugestoes
    ? sugestoes
    : sugestoes.slice(0, 4);

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
            { color: textColor },
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

    const iconName = item.tipo === 'usuario' ? 'person-outline' : item.icone;

    return (
      <View style={item.tipo === 'usuario' ? styles.userSuggestionContent : styles.itemMainContent}>
        <View style={styles.iconWrap}>
          <Animated.View
            style={{ opacity: iconBaseOpacity }}
          >
            <Ionicons
              name={iconName}
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
              name={iconName}
              size={16}
              color="#FD7509"
            />
          </Animated.View>
        </View>

        <Animated.Text
          style={[
            item.tipo === 'usuario' ? styles.suggestionText : styles.suggestionText,
            { color: textColor },
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
            {populares.map((item, index) => (
              <View
                key={item.id}
                style={styles.popularItemWrapper}
              >
                <View
                  style={[
                    styles.popularItem,
                    {
                      backgroundColor:
                        popularCardColors[index % popularCardColors.length],
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