import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <View style={{ backgroundColor: '#E0FFFF', paddingVertical: 2, paddingHorizontal: 7, borderRadius: 8, borderWidth: 1, borderColor: '#00CED1' }}>
        <Text style={{ color: '#008B8B', fontSize: 18 }}>
          I am a Tailwind Expo Go app!
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}



function App() {
  return (
    <></>
  );
}

export default App;
