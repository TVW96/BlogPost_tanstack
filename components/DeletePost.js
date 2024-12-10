import React from 'react';
import { Button, View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const deletePost = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
};

const DeletePost = ({ postId }) => {
    const mutation = useMutation(() => deletePost(postId));

    return (
        <View>
            <Button title="Delete Post" onPress={() => mutation.mutate()} />
        </View>
    );
};

export default DeletePost;
