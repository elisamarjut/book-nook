import { PaperProvider } from 'react-native-paper';
import SearchResults from './SearchResults';
import BookInfo from './BookInfo';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function SearchScreen() {

    return (
        <PaperProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="SearchResults"
                    component={SearchResults}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BookInfo"
                    component={BookInfo}
                    options={{ title: 'Book Information' }}
                />
            </Stack.Navigator>
            <StatusBar style='auto' />
        </PaperProvider>
    );
}