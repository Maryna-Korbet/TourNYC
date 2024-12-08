import React, { FC } from 'react';
import {
    View,
    Text,
} from 'react-native';


type CommentsScreenProps = {
    navigation: any,
};

const CommentsScreen: FC<CommentsScreenProps> = ({ navigation }) => {

    return (
        <View> 
            <Text>Comments</Text>
        </View>
    );
};

export default CommentsScreen;