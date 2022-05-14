import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

const FilterIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={21}
    fill="none"
    {...props}
  >
    <Path stroke="#000" d="M.585 2.02h23.52M.585 9.58h23.52M.585 17.98h23.52" />
    <Circle cx={17.385} cy={10.081} r={2.02} fill="#fff" stroke="#000" />
    <Circle cx={6.465} cy={2.52} r={2.02} fill="#fff" stroke="#000" />
    <Circle cx={6.465} cy={18.479} r={2.02} fill="#fff" stroke="#000" />
  </Svg>
)

export default FilterIcon
