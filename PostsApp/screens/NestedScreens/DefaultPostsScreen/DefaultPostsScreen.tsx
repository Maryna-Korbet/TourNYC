import React, { FC, useEffect, useState } from 'react';
import {
    View,
    Image,
    Text,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import LocationButton from 'components/buttons/LocationButton';
import CommentIcon from 'icons/CommentIcon';

import { styles } from './DefaultPostsScreen.styles';



type Post = {
    picture: string,
    name: string,
    address?: string,
    location?: {
        coords: {
            latitude: number,
            longitude: number,
        }
    }
};

type DefaultPostsScreenProps = {
    route: any,
    navigation: any,
}

const DefaultPostsScreen: FC<DefaultPostsScreenProps> = ({ route, navigation }) => {
    const [postList, setPostList] = useState<Post[]>([]);

    useEffect(() => {
        if (route.params?.post) {
            const formattedPost = {
                picture: route.params.post[0],
                name: route.params.post[1],
                location: route.params.post[2],
                address: route.params.post[3],
            };
            // Convert into an array of objects
            setPostList([formattedPost]);
            
            //! Delete cosole.log
            console.log('Formatted post:', formattedPost);
        }
    }, [route.params?.post]);

    const handlePostLocation = () => {
        navigation.navigate('Map', { location: postList[0].location });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={postList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <View style={styles.postPictureContainer}>
                            <Image
                                source={{ uri: item.picture }}
                                style={styles.postPicture}
                            />
                        </View>
                    
                        <View>
                            <Text style={styles.postTitle}>{item.name}</Text>
                        </View>
                        
                        <View style={styles.postInfoContainer}>
                            <View style={styles.postCommentContainer}>
                                <CommentIcon
                                    style={styles.postCommentIcon}
                                />
                                <Text style={styles.postCommentText}>0</Text>
                            </View>
                            
                            <View style={styles.postLocationContainer}>
                                <LocationButton
                                    style={styles.postLocationButton}
                                    onLocation={handlePostLocation}
                                />
                                <Text style={styles.picturesLoationText}>{item.address || 'Not provided'}</Text>
                            </View>
                        </View>
                        
                    </View>
                )}
            />
        </View>
    );
};

export default DefaultPostsScreen;

