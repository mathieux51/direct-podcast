import React from "react"
import styled from "styled-components"

const Text = styled.span`
  color: ${(props) => props.theme.white};
  font-size: 24px;
`

function toHHMMSS(seconds) {
  const format = (val) => `0${Math.floor(val)}`.slice(-2)
  const hours = seconds / 3600
  const minutes = (seconds % 3600) / 60

  return [hours, minutes, seconds % 60].map(format).join(":")
}

const Timer = () => {
  const [count, setCount] = React.useState(0)

  const requestRef = React.useRef()
  const previousTimeRef = React.useRef(null)

  const animate = React.useCallback((time) => {
    if (previousTimeRef && previousTimeRef.current) {
      const deltaTime = time - previousTimeRef.current

      setCount((prevCount) => prevCount + deltaTime * 0.001)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }, [])

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [animate])

  return <Text>{toHHMMSS(Math.round(count))}</Text>
}

export default Timer
