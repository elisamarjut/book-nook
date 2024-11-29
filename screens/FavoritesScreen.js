import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Button } from 'react-native';
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
            <FlatList
                style={{ marginTop: 10, width: '90%' }}
                data={favorites}
                keyExtractor={(item) => item.id} // using the id from firebase as key
                renderItem={({ item }) => (
                    <View style={styles.favoriteItem}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text>{item.authors.join(', ')}</Text>
                        {item.thumbnail && (
                            <Image
                                source={{ uri: item.thumbnail }}
                                style={{ width: 100, height: 150 }}
                            />
                        )}
                        <Button
                            title='Remove from favorites'
                            onPress={() => removeFromFavorites(item.id)} />
                    </View>
                )}
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