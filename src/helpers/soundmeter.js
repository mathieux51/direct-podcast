// Meter class this generates a number correlated to audio volume.
// The meter class itself displays nothing, but it makes the
// instantaneous and time-decaying volumes available for inspection.
// It also reports on the fraction of samples this were at or near
// the top of the measurement range.

//
// const drawAlt = () => {
//         drawVisual = requestAnimationFrame(drawAlt);
//
//         analyser.getByteFrequencyData(dataArrayAlt);
//
//         canvasCtx.fillStyle = 'rgb(0, 0, 0)';
//         canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
//
//         var barWidth = (WIDTH / bufferLengthAlt) * 2.5;
//         var barHeight;
//         var x = 0;
//
//         for(var i = 0; i < bufferLengthAlt; i++) {
//           barHeight = dataArrayAlt[i];
//
//           canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
//           canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
//
//           x += barWidth + 1;
//         }
//       };

// const drawVisual = requestAnimationFrame(drawAlt)

// on stop
// window.cancelAnimationFrame(drawVisual)

// analyser.getByteFrequencyData(dataArrayAlt)

// export default class SoundMeter {
//   constructor() {
//     // this.context = new (window.AudioContext || window.webkitAudioContext)();
//     // this.analyser = audioCtx.createAnalyser();
//
//
//     // const bufferLengthAlt = analyser.frequencyBinCount;
//     // const dataArrayAlt = new Uint8Array(bufferLengthAlt);
//
//
//     // this.context = context
//     // this.instant = 0.0
//
//     // this.scriptProcessor = context.createScriptProcessor(2048, 1, 1)
//     // this.scriptProcessor.onaudioprocess = (event) => {
//     //   const input = event.inputBuffer.getChannelData(0)
//     //   let sum = 0.0
//     //   // eslint-disable-next-line
//     //   for (let i = 0; i < input.length; ++i) {
//     //     sum += input[i] * input[i]
//     //   }
//     //   this.instant = Math.sqrt(sum / input.length)
//     // }
//   }

// connectToSource = (stream) =>
//   new Promise((resolve, reject) => {
//     try {
//       // const source = audioCtx.createMediaStreamSource(stream);
//       this.mic = this.context.createMediaStreamSource(stream)
//       // source.connect(analyser)
//       this.mic.connect(this.analyser)
//       // analyser.connect(audioCtx.destination)
//       this.analyser.connect(this.context.destination)

//       // this.scriptProcessor.connect(this.context.destination)
//       resolve()
//     } catch (error) {
//       reject(error)
//     }
//   })

//   stop = () => {
//     this.mic.disconnect()
//     this.script.disconnect()
//   }
// }
