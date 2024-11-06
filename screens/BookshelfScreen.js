import { StyleSheet, Text, View } from 'react-native';

export default function FavoritesScreen() {
    return (
        <View style={styles.container}>
            <Text>View your bookshelves here</Text>
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
});