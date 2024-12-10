import React, { useState } from 'react';
import { TextInput, FlatList, View, Text, Button } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

// Fetch posts by user ID
const fetchPostsByUser = async (userId) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return data;
};

// Create a new post
const createPost = async (newPost) => {
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    return data;
};

// Main component
const FilterPosts = () => {
    const [userId, setUserId] = useState(1);
    const [localPosts, setLocalPosts] = useState([]);

    const { data, error, isLoading } = useQuery({
        queryKey: ['posts', userId],
        queryFn: () => fetchPostsByUser(userId),
    });

    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: (newPost) => {
            setLocalPosts((prev) => [newPost, ...prev]);
        },
    });

    const handleCreatePost = () => {
        mutation.mutate({ title: 'New Post', body: 'This is a test.', userId });
    };

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error fetching posts</Text>;

    const allPosts = [...localPosts, ...(data || [])];

    return (
        <View style={{ padding: 16 }}>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
                placeholder="Enter User ID"
                keyboardType="numeric"
                value={String(userId)}
                onChangeText={(text) => setUserId(Number(text))}
            />
            <FlatList
                data={allPosts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text>
                        User {item.userId}: {item.title}
                    </Text>
                )}
            />
        </View>
    );
};

export default FilterPosts;

