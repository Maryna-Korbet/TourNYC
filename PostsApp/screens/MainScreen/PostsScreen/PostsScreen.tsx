import React, { FC, useEffect, useState } from 'react';
import {
    View,
    Image,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { styles } from './PostsScreen.styles';


type Post = {
    picture: string;
};

type PostsScreenProps = {
    route: any,
}

const PostsScreen: FC<PostsScreenProps> = ({ route }) => {
    const { posts } = route.params || {};
    const [postList, setPostList] = useState<Post[]>([]);

    useEffect(() => {
        if (posts && posts.length > 0) {
            setPostList(posts);
        }
    }, [posts]);

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Image
                            source={{ uri: item.picture }}
                            style={styles.postPicture}
                            onError={(e) => console.log('Image load error', e.nativeEvent.error)}
                        />
                    </View>
                )}
            />
        </View>
    )
};

export default PostsScreen;
