import React from 'react'
import MicSVGVolume from './MicSVGVolume'

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
    this.analyser.fftSize = 32
    this.analyser.minDecibels = -90;
    // this.analyser.maxDecibels = -10;
    // this.analyser.smoothingTimeConstant = 0.85

    this.source.connect(this.analyser)

    this.visualize()
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.drawVisual)
    this.source.disconnect()
    this.analyser.disconnect()
  }

  visualize = () => {
    const bufferLength = this.analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    // const dataArray = new Float32Array(bufferLength)

    const draw = () => {
      this.drawVisual = requestAnimationFrame(draw)

      this.analyser.getByteFrequencyData(dataArray)

      let sum = 0.0
      // eslint-disable-next-line
      for (let i = 0; i < bufferLength; i++) {
        // sum += dataArray[i] * dataArray[i]
        sum += dataArray[i]
      }
      // this.instant = Math.sqrt(sum / bufferLength)
      this.instant = sum / bufferLength
      this.setState({ instant: Math.floor(this.instant) })
    }

    draw()
  }

  render() {
    const { instant } = this.state
    const { className } = this.props
    return <MicSVGVolume instant={instant} className={className} />
  }
}

export default Mic
