import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function Layout() {
  const [showTabBar, setShowTabBar] = useState(true);

  useEffect(() => {
    // You can place any logic here to control the visibility globally
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.bgColor,
          borderTopWidth: 0,
          marginBottom: 20,
          padding: 0,
          display: showTabBar ? 'flex' : 'none', // Dynamically control visibility
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.black,
        tabBarInactiveTintColor: Colors.grey,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="camera-outline" size={28} color={color} />
          ),
          tabBarStyle: { display: 'none' }, // Hide tab bar when focused
        }}
        listeners={{
          focus: () => {
            setShowTabBar(false); // Hide tab bar when focused on voicelearn
          },
          blur: () => {
            setShowTabBar(true); // Show tab bar when blurred from voicelearn
          },
        }}
      />
      <Tabs.Screen name="letter"
       options={{
        tabBarStyle: { display: 'none' }, // Hide tab bar when focused
      }}
      listeners={{
        focus: () => {
          setShowTabBar(false); // Hide tab bar when focused on voicelearn
        },
        blur: () => {
          setShowTabBar(true); // Show tab bar when blurred from voicelearn
        },
      }}
      />
      <Tabs.Screen
        name="arvr"
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: Colors.primaryColor,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 10,
                height: 50,
              }}
            >
              <Ionicons name="camera" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="voicelearn"
        options={{
          tabBarStyle: { display: 'none' }, // Hide tab bar when focused
        }}
        listeners={{
          focus: () => {
            setShowTabBar(false); // Hide tab bar when focused on voicelearn
          },
          blur: () => {
            setShowTabBar(true); // Show tab bar when blurred from voicelearn
          },
        }}
      />
      <Tabs.Screen name="wordmatch"
       options={{
        tabBarStyle: { display: 'none' }, // Hide tab bar when focused
      }}
      listeners={{
        focus: () => {
          setShowTabBar(false); // Hide tab bar when focused on voicelearn
        },
        blur: () => {
          setShowTabBar(true); // Show tab bar when blurred from voicelearn
        },
      }}
      />
      <Tabs.Screen name = "welcome"
       options={{
        tabBarStyle: { display: 'none' }, // Hide tab bar when focused
      }}
      listeners={{
        focus: () => {
          setShowTabBar(false); // Hide tab bar when focused on voicelearn
        },
        blur: () => {
          setShowTabBar(true); // Show tab bar when blurred from voicelearn
        },
      }}
      />
         <Tabs.Screen name = "mala"
       options={{
        tabBarStyle: { display: 'none' }, // Hide tab bar when focused
      }}
      listeners={{
        focus: () => {
          setShowTabBar(false); // Hide tab bar when focused on voicelearn
        },
        blur: () => {
          setShowTabBar(true); // Show tab bar when blurred from voicelearn
        },
      }}
      />
    </Tabs>
  );
}
