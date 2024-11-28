import { StyleSheet, Text, View } from 'react-native';

export default function BookInfo({ route }) {
    const { book } = route.params;

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{book.title}</Text>
            {book.authors && <Text>Authors: {book.authors.join(', ')}</Text>}
            {book.description && <Text>Description: {book.description}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
});