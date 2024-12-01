import { useNavigation } from "@react-navigation/native";
import { Card, IconButton, Text } from "react-native-paper";

export default function BookCard({ book, saveToFavorites }) {
    const navigation = useNavigation();
    const { title, authors, imageLinks } = book.volumeInfo;
    const thumbnail = imageLinks?.thumbnail || 'No thumbnail available';

    return (
        <Card style={{ marginBottom: 10 }}>
            <Card.Title title={title || 'No title available'} />
            <Card.Content>
                <Text variant="bodyMedium">{authors || 'Unknown Author(s)'}</Text>
            </Card.Content>
            <Card.Cover source={{ uri: thumbnail }} />
            <Card.Actions>
                <IconButton
                    icon='information-outline'
                    onPress={() => navigation.navigate('BookInfo', { book: book.volumeInfo })} />
                <IconButton
                    icon='heart-outline'
                    onPress={() => saveToFavorites(book)} />
            </Card.Actions>
        </Card>
    );
};