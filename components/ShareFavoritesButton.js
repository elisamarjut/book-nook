import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Button, Alert } from 'react-native';
import { useState } from 'react';

export default function ShareFavoritesButton({ favorites }) {
    const [isSharing, setIsSharing] = useState(false);

    const createFavoritesTextFile = async () => {
        // Create a string from the favorites array
        const favoritesText = favorites.map((favorite, index) => {
            return `${index + 1}. ${favorite.title} by ${favorite.authors.join(', ')}`;
        }).join('\n');

        const fileUri = FileSystem.documentDirectory + 'favorites.txt';

        try {
            setIsSharing(true);

            // Write the favorites text to a file
            await FileSystem.writeAsStringAsync(fileUri, favoritesText);

            // Share the file using expo-sharing
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri);
            } else {
                Alert.alert('Sharing is not available on this device');
            }

        } catch (error) {
            console.error('Error creating or sharing favorites file:', error);
            Alert.alert('There was an issue sharing the favorites file.');
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <Button
            title={isSharing ? "Sharing..." : "Share Favorites"}
            onPress={createFavoritesTextFile}
            disabled={isSharing || favorites.length === 0}
        />
    );
}