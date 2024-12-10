import React, { useState } from 'react';
import { TextInput, Button, View, Text, FlatList } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// Function to create a new post
const createPost = async (newPost) => {
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    return data;
};

// Main component
const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [localPosts, setLocalPosts] = useState([]); // Local state to track posts

    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: (newPost) => {
            console.log('Post created successfully:', newPost);
            // Add the new post to the local state
            setLocalPosts((prevPosts) => [...prevPosts, newPost]);
        },
    });

    const handleSubmit = () => {
        mutation.mutate({ title, body, userId: 1 });
    };

    return (
        <View style={{ padding: 16 }}>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
                placeholder="Body"
                value={body}
                onChangeText={setBody}
            />
            <Button title="Create Post" onPress={handleSubmit} />

            <Text style={{ marginTop: 16, fontWeight: 'bold' }}>Local Posts:</Text>
            <FlatList
                data={localPosts}
                keyExtractor={(item, index) => index.toString()} // Use index as a key for new posts
                renderItem={({ item }) => (
                    <Text>
                        User {item.userId}: {item.title}
                    </Text>
                )}
            />
        </View>
    );
};

export default CreatePost;


