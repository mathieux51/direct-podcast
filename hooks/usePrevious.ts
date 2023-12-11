import React from 'react'

const usePrevious = (value: string) => {
  const ref = React.useRef("")
  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export default usePrevious
