import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { app } from "../firebaseConfig";

export default function FavoritesScreen() {
    const [favorites, setFavorites] = useState([]);

    const database = getDatabase(app);

    useEffect(() => {
        const favoritesRef = ref(database, 'favorites/');

        const unsubscribe = onValue(favoritesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert the object of favorites into an array
                const favoritesList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                }));
                setFavorites(favoritesList);
            } else {
                setFavorites([]);
            }
        });

        // Clean up the listener when the component is unmounted
        return () => unsubscribe();
    }, [database]);

    const removeFromFavorites = (bookId) => {
        const bookRef = ref(database, `favorites/${bookId}`);
        remove(bookRef)
            .then(() => {
                setFavorites((prevFavorites) => prevFavorites.filter(book => book.id !== bookId));
            })
            .catch((error) => {
                console.error("Error removing book from favorites:", error);
            });
    };

    return (
        <View style={styles.container}>
            {favorites.length === 0 ? (
                <Text variant="bodyLarge" style={styles.noFavoritesText}>
                    You have not favorited any books
                </Text>
            ) : (
                <FlatList
                    style={{ marginTop: 10, width: '90%' }}
                    data={favorites}
                    keyExtractor={(item) => item.id} // using the id from firebase as key
                    renderItem={({ item }) => (
                        <Card style={{ marginBottom: 10 }}>
                            <Card.Title title={item.title} />
                            <Card.Content>
                                <Text variant="bodyMedium">{item.authors.join(', ')}</Text>
                            </Card.Content>
                            <Card.Cover source={{ uri: item.thumbnail }} />
                            <Card.Actions>
                                <IconButton
                                    icon='trash-can-outline'
                                    onPress={() => removeFromFavorites(item.id)} />
                            </Card.Actions>
                        </Card>
                    )}
                />
            )}
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
    noFavoritesText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#555',
    },
    favoriteItem: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        width: '90%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});