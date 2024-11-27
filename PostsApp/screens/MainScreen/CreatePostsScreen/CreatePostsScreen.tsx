import React, { FC, useState, useEffect } from 'react';
import {
    View,
} from 'react-native';

import CameraScreen from '../CameraScreen/CameraScreen';

import { styles } from './CreatePostsScreen.styles';



type CreatePostsScreenProps = {
    navigation: any;
    route: any;
}

const CreatePostsScreen: FC<CreatePostsScreenProps> = ({ navigation, route }) => {
    const [posts, setPosts] = useState<string[]>([]);

    useEffect(() => {
        if (route.params) {
            setPosts(prev => [...prev, route.params]);
        }
    }, [route.params]);

    console.log("posts---->", posts);

    return (
        <View style={styles.container}>
            <CameraScreen navigation={navigation} route={route}/>
        </View>
    );
};

export default CreatePostsScreen;