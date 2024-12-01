import { useState } from "react";
import { FlatList, StyleSheet, View, Keyboard } from 'react-native';
import { Button, TextInput, Text, Snackbar } from 'react-native-paper';
import { app } from "../firebaseConfig";
import { getDatabase, ref, push } from "firebase/database";
import BookCard from "./BookCard";
import useBooksFetch from "../hooks/useBooksFetch";

export default function SearchResults() {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const database = getDatabase(app);

    const [keyword, setKeyword] = useState('');
    const [snackBarVisible, setSnackBarVisible] = useState(false);

    const url = apiUrl + keyword + '&key=' + process.env.EXPO_PUBLIC_API_KEY;

    const { books, loading, error, handleFetch } = useBooksFetch(url);

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
                setSnackBarVisible(true);
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
                onChangeText={setKeyword}
            />
            <Button
                loading={loading}
                mode="contained"
                icon="search-web"
                onPress={() => { Keyboard.dismiss(); handleFetch(); }}>
                Search
            </Button>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <FlatList
                style={{ marginTop: 10, width: '90%' }}
                data={books}
                renderItem={({ item }) => (
                    <BookCard book={item} saveToFavorites
                        ={saveToFavorites} />
                )}
            />
            <Snackbar
                visible={snackBarVisible}
                onDismiss={() => setSnackBarVisible(false)}
                duration={3000}>
                Book was added to favorites!
            </Snackbar>
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