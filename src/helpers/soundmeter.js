// Meter class this generates a number correlated to audio volume.
// The meter class itself displays nothing, but it makes the
// instantaneous and time-decaying volumes available for inspection.
// It also reports on the fraction of samples this were at or near
// the top of the measurement range.
export default class SoundMeter {
  constructor(context) {
    this.context = context
    this.instant = 0.0

    this.scriptProcessor = context.createScriptProcessor(2048, 1, 1)
    this.scriptProcessor.onaudioprocess = (event) => {
      const input = event.inputBuffer.getChannelData(0)
      let sum = 0.0
      // eslint-disable-next-line
      for (let i = 0; i < input.length; ++i) {
        sum += input[i] * input[i]
      }
      this.instant = Math.sqrt(sum / input.length)
    }
  }

  connectToSource = (stream) =>
    new Promise((resolve, reject) => {
      try {
        this.mic = this.context.createMediaStreamSource(stream)
        this.mic.connect(this.scriptProcessor)

        // necessary to make sample run, but should not be.
        this.scriptProcessor.connect(this.context.destination)
        resolve()
      } catch (error) {
        reject(error)
      }
    })

  stop = () => {
    this.mic.disconnect()
    this.script.disconnect()
  }
}
