import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import BookshelfScreen from './screens/BookshelfScreen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'search';
            } else if (route.name === 'Bookshelves') {
              iconName = 'favorite';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Search' component={SearchScreen} />
        <Tab.Screen name='Bookshelves' component={BookshelfScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    //<StatusBar style="auto" />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
