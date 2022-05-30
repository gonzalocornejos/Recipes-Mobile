import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackArrow(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M31.334 14.083H8.008L18.722 3.369 16 .666.667 15.999 16 31.333l2.703-2.703L8.008 17.916h23.326v-3.833z"
        fill="#000"
      />
    </Svg>
  )
}

export default BackArrow
