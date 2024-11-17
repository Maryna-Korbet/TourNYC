import React, { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';

type Props = React.ComponentProps<typeof Ionicons>;

const IoniconsElement: FC<Props> = (props) => {
    return <Ionicons {...props} />
};

export default IoniconsElement;
