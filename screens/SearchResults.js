import { useState } from "react";
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, TextInput, Card, Text } from 'react-native-paper';

export default function SearchResults() {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [keyword, setKeyword] = useState('');
    // Lisää vielä searchTerm, joka määrittää haetaanko otsikon vai kirjailijan perusteella
    // const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const url = apiUrl + keyword + '&key=' + process.env.EXPO_PUBLIC_API_KEY;

    const handleFetch = () => {
        setLoading(true);
        fetch(url)
            .then(response => {
                if (!response)
                    throw new Error("Error in fetch: " + response.statusText);
                return response.json();
            })
            .then(data => setBooks(data.items))
            .catch(err => {
                console.error(err);
            })
            .finally(() => setLoading(false))
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={{
                    width: '90%',
                    marginBottom: 10,
                    marginTop: 10
                }}
                label="Keyword"
                value={keyword}
                onChangeText={text => setKeyword(text)}
            />
            <Button loading={loading} mode="contained" icon="search-web" onPress={handleFetch}>
                Search
            </Button>
            <FlatList
                style={{ marginTop: 10, width: '90%' }}
                data={books}
                renderItem={({ item }) =>
                    <Card style={{ marginBottom: 10 }}>
                        <Card.Title title={item.volumeInfo.title} />
                        <Card.Content>
                            <Text variant="bodyMedium">{item.volumeInfo.authors}</Text>
                        </Card.Content>
                    </Card>
                }
            />
        </View>
    );
}
// Lisää card actions ja siitä yhteys lisätietoja-sivulle

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});