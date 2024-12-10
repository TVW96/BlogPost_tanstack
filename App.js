import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';
import EditPost from './components/UpdatePost';
import DeletePost from './components/DeletePost';
import FilterPosts from './components/FilterPost';
import PatchPost from './components/PatchPost';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Text style={styles.title}>Blog Post Manager</Text>
        <ScrollView style={styles.scrollContainer}>
          {/* Create Post Section */}
          <View style={styles.section}>
            <Text style={styles.header}>Create a New Post</Text>
            <CreatePost />
          </View>

          {/* Filter Posts by User Section */}
          <View style={styles.section}>
            <Text style={styles.header}>Filter Posts by userId</Text>
            <FilterPosts />
          </View>

          {/* Update Post Section */}
          <View style={styles.section}>
            <Text style={styles.header}>Update a Post</Text>
            <EditPost postId={1} /> {/* Use specific postId here */}
          </View>

          {/* Patch Post Section (Only title) */}
          <View style={styles.section}>
            <Text style={styles.header}>Patch a Post (Title Only)</Text>
            <PatchPost postId={1} /> {/* Use specific postId here */}
          </View>

          {/* Delete Post Section */}
          <View style={styles.section}>
            <Text style={styles.header}>Delete a Post</Text>
            <DeletePost postId={1} /> {/* Use specific postId here */}
          </View>

          {/* Posts List Section */}
          <View style={styles.section}>
            <Text style={styles.header}><h2>All Posts</h2></Text>
            <Posts />
          </View>

        </ScrollView>
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
