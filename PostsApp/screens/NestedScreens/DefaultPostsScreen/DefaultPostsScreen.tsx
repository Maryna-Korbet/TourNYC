import React, { FC, useEffect, useState } from 'react';
import {
    View,
    Image,
    Text,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { styles } from './DefaultPostsScreen.styles';


type Post = {
    picture: string,
    location?: {
        coords: {
            latitude: number,
            longitude: number,
        }
    }
};

type DefaultPostsScreenProps = {
    route: any,
}

const DefaultPostsScreen: FC<DefaultPostsScreenProps> = ({ route }) => {
    const { posts } = route.params || {};
    const [postList, setPostList] = useState<Post[]>([]);

    useEffect(() => {
        if (posts && posts.length > 0) {
            setPostList(posts);
        }
    }, [posts]);

    const picturesCoordinates = () => {
        return postList.map((post) => {
            if (post.location?.coords) {
                const { latitude, longitude } = post.location.coords;
                return `Latitude: ${latitude}, Longitude: ${longitude}`;
            }
            return `No location data available`;
        })
            .join('\n');
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={postList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Image
                            source={{ uri: item.picture }}
                            style={styles.postPicture}
                        />
                        <View >
                            <Text style={styles.picturesLoationTitle}>Location:</Text>
                            <Text style={styles.picturesLoationText}>{picturesCoordinates()}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default DefaultPostsScreen;
