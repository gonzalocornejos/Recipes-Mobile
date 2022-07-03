import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EditIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.745 8.027l1.226 1.226-12.078 12.08H2.666v-1.226l12.079-12.08zM19.544 0c-.333 0-.68.133-.933.387l-2.44 2.44 5 5 2.44-2.44c.519-.52.519-1.36 0-1.88L20.49.387A1.309 1.309 0 0019.544 0zm-4.8 4.253L0 19v5h5L19.743 9.253l-5-5z"
        fill="#000"
      />
    </Svg>
  )
}

export default EditIcon