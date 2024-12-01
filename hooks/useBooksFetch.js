import { useState } from "react";
import { Keyboard } from "react-native";

export default function useBooksFetch(url) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetch = () => {
        setError(null); // Clear any previous errors
        Keyboard.dismiss();
        setLoading(true);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error in fetch: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (!data.items || data.items.length === 0) {
                    setError("No books found for the given keyword.");
                    setBooks([]);
                } else {
                    setBooks(data.items)
                }
            })
            .catch(err => {
                console.error(err);
                setError("Failed to fetch books. Please try again later.");
            })
            .finally(() => setLoading(false))
    };

    return { books, loading, error, handleFetch };
};