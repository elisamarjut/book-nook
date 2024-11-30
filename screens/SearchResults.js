import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FlatList, StyleSheet, View, Keyboard } from 'react-native';
import { Button, TextInput, Card, Text, IconButton } from 'react-native-paper';
import { app } from "../firebaseConfig";
import { getDatabase, ref, push } from "firebase/database";

export default function SearchResults() {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const navigation = useNavigation();

    const database = getDatabase(app);

    const [keyword, setKeyword] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const url = apiUrl + keyword + '&key=' + process.env.EXPO_PUBLIC_API_KEY;

    const handleFetch = () => {
        setError(null); // Clear any previous errors
        Keyboard.dismiss();
        setLoading(true);
        fetch(url)
            .then(response => {
                if (!response.ok) // Check for HTTP errors
                    throw new Error("Error in fetch: " + response.statusText);
                return response.json();
            })
            .then(data => {
                if (!data.items || data.items.length === 0) {
                    setError("No books found for the given keyword.");
                    setBooks([]);
                } else {
                    setBooks(data.items)
                }
            })
            .catch(err => {
                console.error(err);
                setError("Failed to fetch books. Please try again later.");
            })
            .finally(() => setLoading(false))
    };

    const saveToFavorites = (book) => {
        const favoriteData = {
            title: book.volumeInfo.title || "Unknown Title",
            authors: book.volumeInfo.authors || ["Unknown Author"],
            description: book.volumeInfo.description || "No description available",
            thumbnail: book.volumeInfo.imageLinks?.thumbnail || null,
        };

        push(ref(database, 'favorites/'), favoriteData)
            .then(() => {
                console.log("Book saved to favorites!");
            })
            .catch(err => {
                console.error("Error saving book to favorites: ", err);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={{
                    width: '90%',
                    marginBottom: 10,
                    marginTop: 10,
                }}
                label="Enter keyword"
                value={keyword}
                onChangeText={text => setKeyword(text)}
            />
            <Button loading={loading} mode="contained" icon="search-web" onPress={handleFetch}>
                Search
            </Button>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <FlatList
                style={{ marginTop: 10, width: '90%' }}
                data={books}
                renderItem={({ item }) =>
                    <Card style={{ marginBottom: 10 }}>
                        <Card.Title title={item.volumeInfo.title} />
                        <Card.Content>
                            <Text variant="bodyMedium">{item.volumeInfo.authors}</Text>
                        </Card.Content>
                        <Card.Cover source={{ uri: item.volumeInfo.imageLinks.thumbnail }} />
                        <Card.Actions>
                            <IconButton
                                icon='information-outline'
                                onPress={() => navigation.navigate('BookInfo', { book: item.volumeInfo })} />
                            <IconButton
                                icon='heart-outline'
                                onPress={() => saveToFavorites(item)} />
                        </Card.Actions>
                    </Card>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});