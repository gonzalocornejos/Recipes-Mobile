import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HeartIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      fill="none"
      viewBox="0 0 23 19"
      {...props}
    >
      <Path
        fill="#DF2C2C"
        d="M2.474 2.11a5.5 5.5 0 000 7.78l8.132 8.13a1 1 0 001.414 0l.01-.009a.996.996 0 00.312-.212l8.132-8.132a5.5 5.5 0 10-7.778-7.778l-1.333 1.333-1.11-1.111a5.5 5.5 0 00-7.779 0z"
      />
    </Svg>
  )
}

export default HeartIcon
