import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";

const CameraSwitchIcon = (props: SvgProps) => (
    <Svg
        {...props}
        viewBox="0 0 48 48"
        width={24}
        height={24}
    >
        <G fill="#FFF">
            <Path d="M33.9 12.1H14.2L17.6 7c.4-.6 1-.9 1.7-.9h9.6c.7 0 1.3.3 1.7.9l3.3 5.1zM14 11H8V9.2C8 8.5 8.5 8 9.2 8h3.6c.7 0 1.2.5 1.2 1.2V11z" />
            <Path d="M40 42H8c-2.2 0-4-1.8-4-4V14c0-2.2 1.8-4 4-4h32c2.2 0 4 1.8 4 4v24c0 2.2-1.8 4-4 4z" />
        </G>
        <Path
            fill="#212121"
            d="M34 25c0-5.5-4.5-10-10-10-2.4 0-4.6.8-6.3 2.2l1.2 1.6C20.3 17.7 22 17 24 17c4.4 0 8 3.6 8 8h-3.5l4.5 5.6 4.5-5.6H34zM29.1 31.2C27.7 32.3 25.9 33 24 33c-4.4 0-8-3.6-8-8h3.5L15 19.4 10.5 25H14c0 5.5 4.5 10 10 10 2.4 0 4.6-.8 6.3-2.2l-1.2-1.6z"
        />
    </Svg>
);

export default CameraSwitchIcon;