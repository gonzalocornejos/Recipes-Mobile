import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CrossIcon(props) {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.468 16.017L8.67 10.506l-5.511 5.799-1.933-1.837 5.511-5.8-5.799-5.51 1.837-1.933 5.8 5.51 5.51-5.798 1.933 1.837-5.51 5.799 5.798 5.51-1.837 1.934z"
        fill="#000"
      />
    </Svg>
  )
}

export default CrossIcon