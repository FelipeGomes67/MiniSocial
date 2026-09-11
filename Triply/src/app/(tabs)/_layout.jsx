import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarActiveTintColor: '#FD7509',
          tabBarInactiveTintColor: '#888888',

          tabBarHideOnKeyboard: true,

          tabBarStyle: [
            styles.tabBar,
            {
              height: 64 + insets.bottom,
              paddingBottom: Math.max(
                insets.bottom,
                8
              ),
            },
          ],

          tabBarLabelStyle: styles.label,

          tabBarItemStyle: styles.item,

          tabBarShowLabel: true,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',

            tabBarIcon: ({
              color,
              focused,
            }) => (
              <Ionicons
                name={
                  focused
                    ? 'home'
                    : 'home-outline'
                }
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="criar"
          options={{
            title: 'Criar',

            tabBarIcon: ({
              color,
              focused,
            }) => (
              <Ionicons
                name={
                  focused
                    ? 'add-circle'
                    : 'add-circle-outline'
                }
                size={25}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="notificacoes"
          options={{
            title: 'Notificações',

            tabBarIcon: ({
              color,
              focused,
            }) => (
              <Ionicons
                name={
                  focused
                    ? 'notifications'
                    : 'notifications-outline'
                }
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="perfil"
          options={{
            title: 'Perfil',

            tabBarIcon: ({
              color,
              focused,
            }) => (
              <Ionicons
                name={
                  focused
                    ? 'person'
                    : 'person-outline'
                }
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  tabBar: {
    backgroundColor: '#FFFFFF',

    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',

    paddingTop: 6,

    elevation: 8,

    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },

  item: {
    minHeight: 52,
  },

  label: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
});