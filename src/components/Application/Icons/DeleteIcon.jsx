import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DeleteIcon(props) {
  return (
    <Svg
    width={32}
    height={32}
    viewBox="8 3 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
      <Path d="M13.05 42q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9zm21.9-31.5h-21.9V39h21.9zm-16.6 24.2h3V14.75h-3zm8.3 0h3V14.75h-3zm-13.6-24.2V39z" 
      fill="#000"
      />
    </Svg>
  )
}

export default DeleteIcon
