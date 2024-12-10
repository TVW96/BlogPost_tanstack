import React, { useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Function to update a post using the API
const updatePost = async (id, updatedPost) => {
    const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedPost);
    return data;
};

// EditPost Component
const EditPost = ({ post }) => {
    const [newTitle, setNewTitle] = useState(post.title);
    const [newBody, setNewBody] = useState(post.body);

    const queryClient = useQueryClient(); // React Query's QueryClient for cache management

    // UseMutation for updating the post
    const mutation = useMutation({
        mutationFn: (updatedPost) => updatePost(post.id, updatedPost),
        onSuccess: (updatedData) => {
            console.log('Post updated successfully:', updatedData);

            // Update the query cache to reflect the changes
            queryClient.setQueryData(['posts'], (oldData) =>
                oldData.map((item) => (item.id === post.id ? updatedData : item))
            );
        },
    });

    const handleSubmit = () => {
        mutation.mutate({ title: newTitle, body: newBody, userId: post.userId });
    };

    return (
        <View style={{ padding: 16 }}>
            <Text>Edit Post:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
                value={newTitle}
                onChangeText={setNewTitle}
                placeholder="Title"
            />
            <TextInput
                style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
                value={newBody}
                onChangeText={setNewBody}
                placeholder="Body"
            />
            <Button title="Update Post" onPress={handleSubmit} />
            {mutation.isError && <Text style={{ color: 'red' }}>Error updating post.</Text>}
            {mutation.isLoading && <Text>Updating...</Text>}
            {mutation.isSuccess && <Text style={{ color: 'green' }}>Post updated successfully!</Text>}
        </View>
    );
};

export default EditPost;
