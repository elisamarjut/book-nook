import { PaperProvider } from 'react-native-paper';
import SearchResults from './SearchResults';
import { StatusBar } from 'expo-status-bar';

export default function SearchScreen() {

    return (
        <PaperProvider>
            <SearchResults />
            <StatusBar style='auto' />
        </PaperProvider>
    );
}