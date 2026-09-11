import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BarraPesquisa from '../components/barraPesquisa/BarraPesquisa';
import styles from '../styles/PesquisaStyle';

const pesquisasRecentes = [
  { id: 'recent-1', nome: 'Maldivas', icone: 'time-outline' },
  { id: 'recent-2', nome: 'Hawaii', icone: 'time-outline' },
  { id: 'recent-3', nome: 'Dubai', icone: 'time-outline' },
  { id: 'recent-4', nome: 'São Paulo', icone: 'time-outline' },
];

const maisPesquisas = [
  { id: 'recent-5', nome: 'Bali', icone: 'time-outline' },
  { id: 'recent-6', nome: 'Paris', icone: 'time-outline' },
];

const recomendacoes = [
  { id: 'rec-1', nome: 'Estados Unidos', icone: 'search-outline' },
  { id: 'rec-2', nome: 'Estados Unidos', icone: 'search-outline' },
  { id: 'rec-3', nome: 'Estados Unidos', icone: 'search-outline' },
  { id: 'rec-4', nome: 'Fidalgo.k2', icone: 'person-outline' },
];

const maisRecomendacoes = [
  { id: 'rec-5', nome: 'Japão', icone: 'search-outline' },
  { id: 'rec-6', nome: 'Tailândia', icone: 'search-outline' },
];

const tendencias = [
  { id: 'trend-1', nome: 'Fidalgo.k2', icone: 'person-outline' },
  { id: 'trend-2', nome: 'São Paulo', icone: 'time-outline' },
  { id: 'trend-3', nome: 'São Paulo', icone: 'time-outline' },
  { id: 'trend-4', nome: 'São Paulo', icone: 'time-outline' },
];

export default function Pesquisa() {

  const [pesquisa, setPesquisa] = useState('');
  const [mostrarMaisPesquisas, setMostrarMaisPesquisas] = useState(false);
  const [mostrarMaisRecomendacoes, setMostrarMaisRecomendacoes] = useState(false);
  const [selecionado, setSelecionado] = useState(null);

  const timer = useRef(null);

  const listaPesquisas = mostrarMaisPesquisas
    ? [...pesquisasRecentes, ...maisPesquisas]
    : pesquisasRecentes;

  const listaRecomendacoes = mostrarMaisRecomendacoes
    ? [...recomendacoes, ...maisRecomendacoes]
    : recomendacoes;

  // Deixa o item selecionado laranja por 3 segundos
  function selecionarItem(id) {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setSelecionado(id);

    timer.current = setTimeout(() => {
      setSelecionado(null);
    }, 3000);
  }

  // Cria cada item das listas
  function ItemLista({ item }) {
    const ativo = selecionado === item.id;

    return (
      <Pressable
        style={styles.listItem}
        onPress={() => selecionarItem(item.id)}
      >
        <View style={styles.iconWrap}>
          <Ionicons
            name={item.icone}
            size={14}
            color={ativo ? '#FD7509' : '#7A7A7A'}
          />
        </View>

        <Text
          style={[
            styles.itemText,
            { color: ativo ? '#FD7509' : '#4B4B4B' }
          ]}
        >
          {item.nome}
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.screen}>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <BarraPesquisa
          value={pesquisa}
          onChangeText={setPesquisa}
        />

        {/* Pesquisas recentes */}
        <View style={styles.section}>

          <View style={styles.list}>
            {listaPesquisas.map((item) => (
              <ItemLista
                key={item.id}
                item={item}
              />
            ))}
          </View>

          <Pressable
            style={styles.seeMoreButton}
            onPress={() => setMostrarMaisPesquisas(!mostrarMaisPesquisas)}
          >
            <Text style={styles.seeMoreText}>
              Veja Mais ˅
            </Text>
          </Pressable>

        </View>

        <View style={styles.divider} />

        {/* Recomendações */}
        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Recomendações
          </Text>

          <View style={styles.list}>
            {listaRecomendacoes.map((item) => (
              <ItemLista
                key={item.id}
                item={item}
              />
            ))}
          </View>

          <Pressable
            style={styles.seeMoreButton}
            onPress={() =>
              setMostrarMaisRecomendacoes(!mostrarMaisRecomendacoes)
            }
          >
            <Text style={styles.seeMoreText}>
              Veja Mais ˅
            </Text>
          </Pressable>

        </View>

        <View style={styles.divider} />

        {/* Tendências */}
        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Tendências
          </Text>

          <View style={styles.list}>
            {tendencias.map((item) => (
              <ItemLista
                key={item.id}
                item={item}
              />
            ))}
          </View>

        </View>

      </ScrollView>

    </View>
  );
}