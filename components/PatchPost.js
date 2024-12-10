import React, { useState } from 'react';
import { TextInput, Button, View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const patchPost = async (id, updatedTitle) => {
    const { data } = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, { title: updatedTitle });
    return data;
};

const PatchPost = ({ postId }) => {
    const [newTitle, setNewTitle] = useState('');
    const mutation = useMutation((title) => patchPost(postId, title));

    const handleSubmit = () => {
        mutation.mutate(newTitle);
    };

    return (
        <View>
            <TextInput
                placeholder="New Title"
                value={newTitle}
                onChangeText={setNewTitle}
            />
            <Button title="Update Title" onPress={handleSubmit} />
        </View>
    );
};

export default PatchPost;
