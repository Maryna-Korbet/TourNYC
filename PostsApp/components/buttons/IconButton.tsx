import React, {FC} from "react";
import { TouchableOpacity } from "react-native";


type IconButtonProps = {
    icon: React.ReactNode;
    onPress: () => void;
};

const IconButton: FC<IconButtonProps> = ({ icon, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            {icon}
        </TouchableOpacity>
    );
};

export default IconButton;