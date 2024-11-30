import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function BookInfo({ route }) {
    const { book } = route.params;

    return (
        <ScrollView>
            <View style={styles.container}>
                {book.imageLinks?.thumbnail ? (
                    <Image source={{ uri: book.imageLinks?.thumbnail }}
                        style={styles.image}
                    />
                ) : (
                    <Text style={styles.text}>No picture available</Text>
                )}
                <Text style={[styles.text, styles.title]}>{book.title}</Text>
                {book.authors && <Text style={styles.text}>Authors: {book.authors.join(', ')}</Text>}
                {book.description && <Text style={styles.text}>Description: {book.description}</Text>}
            </View>
        </ScrollView>
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
    image: {
        width: 150,
        height: 200,
        marginBottom: 20,
    },
    text: {
        padding: 10,
        textAlign: 'justify',
        lineHeight: 24,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});