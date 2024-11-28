import React, { FC, useState, useEffect } from 'react';
import {
    View,
    Text,
} from 'react-native';

import CameraScreen from '../CameraScreen/CameraScreen';
import Button from '../../../components/buttons/Button';

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

    const onPublishButton = () => {
        console.log("publish---->", posts)
        navigation.navigate('Posts', { posts });
        setPosts([])
    }

    return (
        <View style={styles.container}>
                <CameraScreen navigation={navigation} route={route} />

                <View style={styles.publishButton}>
                    <Button
                        onPress={onPublishButton}
                    >
                        <Text style={styles.publishButtonText}>
                            Publish
                        </Text>
                    </Button>
                </View>
        </View>
    );
};

export default CreatePostsScreen;