import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { colors } from "../styles/GlobalStyles";


const ArrowLeftIcon = (props: SvgProps) => (
  <Svg
    {...props}
    width={24}
    height={24}
    fill="none"
  >
    <Path
      stroke={colors.black}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.8}
      d="M20 12H4M10 18l-6-6 6-6"
    />
  </Svg>
);

export default ArrowLeftIcon;