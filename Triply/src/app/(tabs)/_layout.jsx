import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF6600", 
        tabBarInactiveTintColor: "#888888",
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
          borderTopWidth: 1,
          borderTopColor: "#E5E5E5",
          backgroundColor: "#FFFFFF",
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: "RedHatText_400Regular",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
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