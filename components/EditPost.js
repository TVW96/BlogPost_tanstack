import React, { useState } from 'react';
import { TextInput, Button, View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const updatePost = async (id, updatedPost) => {
    const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedPost);
    return data;
};

const EditPost = ({ postId }) => {
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');
    const mutation = useMutation((updatedPost) => updatePost(postId, updatedPost));

    const handleSubmit = () => {
        mutation.mutate({ title: newTitle, body: newBody });
    };

    return (
        <View>
            <TextInput
                placeholder="New Title"
                value={newTitle}
                onChangeText={setNewTitle}
            />
            <TextInput
                placeholder="New Body"
                value={newBody}
                onChangeText={setNewBody}
            />
            <Button title="Update Post" onPress={handleSubmit} />
        </View>
    );
};

export default EditPost;
