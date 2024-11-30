import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {

    return (
        <ImageBackground
            style={styles.background}
            source={require("../bookshelf.jpg")}
            resizeMode='cover'>
            <View style={styles.container}>
                <Text style={styles.text}> Welcome to Book Nook!</Text>
            </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 5
    },
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'brown',
    }
});