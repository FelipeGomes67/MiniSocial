import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useUsuario } from '../context/UsuarioContext';
import api from '../service/service';

const interests = [
  ['Praias paradisíacas', '🏝️'],
  ['Trilhas e caminhadas', '🥾'],
  ['Aventura', '🧗'],
  ['Gastronomia local', '🍜'],
  ['Cultura e história', '🏛️'],
  ['Natureza', '🌿'],
  ['Cachoeiras', '💦'],
  ['Acampamento', '⛺'],
  ['Viagens de carro', '🚗'],
  ['Viagens internacionais', '🌎'],
  ['Cidades históricas', '🏘️'],
  ['Vida noturna', '🌙'],
  ['Ecoturismo', '🌱'],
  ['Fotografia de viagem', '📸'],
  ['Mochilão', '🎒'],
  ['Resorts e hotéis', '🏨'],
  ['Ilhas e destinos tropicais', '🌴'],
  ['Esportes e atividades', '🏄'],
];

export default function PreferencesScreen() {
  const { usuario, setUsuario } = useUsuario();
  const [saving, setSaving] = useState(false);

  const [selected, setSelected] = useState(
    new Set(usuario?.preferencias || [])
  );

  const toggle = (name) => {
    setSelected((current) => {
      const next = new Set(current);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const salvarEAvancar = async (pular = false) => {
    if (!usuario?.id) {
      router.replace('/home');
      return;
    }

    try {
      setSaving(true);
      const listaPreferencias = pular ? [] : Array.from(selected);

      const usuarioAtualizado = {
        ...usuario,
        preferencias: listaPreferencias,
      };

      const response = await api.put(`/usuarios/${usuario.id}`, usuarioAtualizado);
      await setUsuario(response.data);

      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/home');
      }
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
      Alert.alert('Erro', 'Não foi possível salvar suas preferências.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={Prefereniastyle.container}>
      <ScrollView
        style={Prefereniastyle.scrollView}
        contentContainerStyle={Prefereniastyle.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={Prefereniastyle.header}>
          <View style={Prefereniastyle.titleWrap}>
            <Text style={Prefereniastyle.title}>Escolha suas</Text>
            <Text style={Prefereniastyle.title}>preferências</Text>
          </View>

          {/* O botão 'Pular' só é exibido no fluxo de primeiro acesso (cadastro) */}
          {!router.canGoBack() && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => salvarEAvancar(true)}
              disabled={saving}
            >
              <Text style={Prefereniastyle.skip}>Pular</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={Prefereniastyle.subtitle}>
          Encontre experiências que combinam com você!
        </Text>

        <View style={Prefereniastyle.chipsWrap}>
          {interests.map(([name, icon]) => {
            const active = selected.has(name);

            return (
              <TouchableOpacity
                key={name}
                activeOpacity={0.9}
                onPress={() => toggle(name)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                style={[
                  Prefereniastyle.chip,
                  active && Prefereniastyle.activeChip,
                ]}
              >
                <Text style={Prefereniastyle.icon}>{icon}</Text>

                <Text
                  style={[
                    Prefereniastyle.chipText,
                    active && Prefereniastyle.activeText,
                  ]}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[Prefereniastyle.nextButton, saving && { opacity: 0.7 }]}
        onPress={() => salvarEAvancar(false)}
        activeOpacity={0.9}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={Prefereniastyle.nextText}>
            {router.canGoBack() ? 'Salvar Alterações' : 'Avançar para o App'}
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const Prefereniastyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    color: '#101010',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  skip: {
    color: '#8F8F8F',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 6,
  },
  subtitle: {
    marginTop: 14,
    color: '#8B8B8B',
    fontSize: 13,
    fontWeight: '400',
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 18,
    columnGap: 10,
    rowGap: 10,
    paddingBottom: 16,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 38,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  activeChip: {
    backgroundColor: '#FFF1E7',
    borderColor: '#FD7509',
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  chipText: {
    color: '#1F1F1F',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  activeText: {
    color: '#FD7509',
  },
  nextButton: {
    position: 'absolute',
    bottom: 12,
    left: 18,
    right: 18,
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: '#FD7509',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});