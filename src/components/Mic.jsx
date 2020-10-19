import React from 'react'
import styled from 'styled-components'
import MicSVG from './MicSVG'

const StyledMic = styled(MicSVG)`
  & path {
    fill: ${(props) => props.theme.red};
  }
`

const Text = styled.span`
  color: ${(props) => props.theme.white};
  font-size: 24px;
  font-family: 'Antipasto', sans-serif;
  text-decoration: none;
`


// const useAnimationFrame = (callback) => {
//   const requestRef = React.useRef()
//   const previousTimeRef = React.useRef()
//
//   const animate = React.useCallback(
//     (time) => {
//       if (previousTimeRef.current !== undefined) {
//         const deltaTime = time - previousTimeRef.current
//         callback(deltaTime)
//       }
//       previousTimeRef.current = time
//       requestRef.current = requestAnimationFrame(animate)
//     },
//     [callback]
//   )
//
//   React.useEffect(() => {
//     requestRef.current = requestAnimationFrame(animate)
//     return () => cancelAnimationFrame(requestRef.current)
//   }, [animate])
// }

class Mic extends React.PureComponent {
  constructor() {
    super()
    this.state = { instant: 0.0 }
  }

  componentDidMount() {
    const { stream } = this.props

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    this.source = audioCtx.createMediaStreamSource(stream)
    this.analyser = audioCtx.createAnalyser()
    // this.analyser.minDecibels = -60
    // this.analyser.maxDecibels = 6
    this.analyser.fftSize = 32
    // analyser.minDecibels = -90;
    // analyser.maxDecibels = -10;
    this.analyser.smoothingTimeConstant = 0.85

    this.source.connect(this.analyser)
    // this.analyser.connect(audioCtx.destination)

    this.visualize()
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.drawVisual)
    this.source.disconnect()
    this.analyser.disconnect()
  }

  visualize = () => {
    const bufferLength = this.analyser.frequencyBinCount
    // const dataArray = new Uint8Array(bufferLength)
    const dataArray = new Float32Array(bufferLength)

    const draw = () => {
      this.drawVisual = requestAnimationFrame(draw)

      // this.analyser.getByteFrequencyData(dataArray)
      this.analyser.getFloatTimeDomainData(dataArray)

      let sum = 0.0
      // eslint-disable-next-line
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i] * dataArray[i]
      }
      this.instant = Math.sqrt(sum / bufferLength)
      this.setState({ instant: Math.floor(this.instant * 1000) / 1000 })
    }

    draw()
  }

  render() {
    const { instant } = this.state
    return (
      <div>
        <Text>{instant} dB</Text>
        <StyledMic />
      </div>
    )
  }
}

export default Mic
