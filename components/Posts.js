import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch posts from the API
const fetchPosts = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return data;
};

// Main component for displaying posts
const Posts = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['posts'],  // The key for the query
        queryFn: fetchPosts,  // The function to fetch the data
    });

    // Handling loading and error states
    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error fetching posts</Text>;

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Text style={styles.item}>Post {item.id}: <strong>{item.title}</strong><hr />{item.body}</Text>}
            />
        </View>
    );
};

// Styling for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
    },
    item: {
        fontSize: 16,
        marginBottom: 20,
        width: "90%",
    },
});

export default Posts;
