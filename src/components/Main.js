import React from "react"
import styled from "styled-components"
import RecordRTC from "recordrtc"
import adapter from "webrtc-adapter"
import Mic from "./Mic"
import MicOff from "./MicOff"
import Timer from "./Timer"
import Footer from "./Footer"

const getFilename = () => {
  const now = new Date()
  const d = now.getDate()
  const m = now.getMonth()
  const y = now.getFullYear()
  const h = now.getHours()
  const min = now.getMinutes()
  const s = now.getSeconds()

  return `${d}${m}${y}${h}${min}${s}.wav`
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.blue};
  flex-direction: column;
`
const Button = styled.button`
  width: 12rem;
  height: 12rem;
  cursor: pointer;
`

const TopContainer = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledFooter = styled(Footer)`
  height: 10%;
`

const BottomNote = styled.span`
  height: 10%;
  width: 100%;
  color: ${(props) => props.theme.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
`

const StyledMic = styled(Mic)`
  & path {
    fill: ${(props) => props.theme.red};
  }
`

const StyledMicOff = styled(MicOff)`
  & path {
    fill: ${(props) => props.theme.white};
  }
`

const Text = styled.span`
  color: ${(props) => props.theme.grey};
  font-size: 24px;
`

const handleStopRecording = (recorder, setRecorder) => () => {
  const blob = recorder.getBlob()
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.style.display = "none"
  a.href = url

  a.download = getFilename()
  document.body.appendChild(a)
  a.click()

  setTimeout(() => {
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }, 1000)

  // bug on Safari iOS
  // RecordRTC.invokeSaveAsDialog(blob)
  setRecorder(null)
}

const handleGetUserMedia = async ({ recorder, setRecorder, setError }) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    if (!recorder) {
      const recorder = RecordRTC(stream, {
        recorderType: RecordRTC.StereoAudioRecorder,
        mimeType: "audio/wav",
      })

      setRecorder(recorder)
    }
  } catch (error) {
    const constraints = navigator.mediaDevices.getSupportedConstraints()
    error.constraints += constraints
    setError(error)
  }
}

function Main() {
  const [isRecording, setIsRecording] = React.useState(false)
  const [recorder, setRecorder] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    handleGetUserMedia({ recorder, setRecorder, setError })
  }, [recorder, isRecording])

  const handleClick = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()

    if (!isRecording) {
      setIsRecording(true)
      if (recorder) {
        recorder.startRecording()
      }
      return
    }

    setIsRecording(false)
    if (recorder) {
      recorder.stopRecording(handleStopRecording(recorder, setRecorder))
    }
  }

  if (error) {
    throw error
  }

  return (
    <Container
      data-browser={adapter.browserDetails.browser}
      data-version={adapter.browserDetails.version}
    >
      <TopContainer>
        <Button onClick={handleClick}>
          {isRecording ? <StyledMic /> : <StyledMicOff />}
        </Button>
        {isRecording ? <Timer /> : <Text>00:00:00</Text>}
      </TopContainer>
      <StyledFooter />
      <BottomNote>D’après une idée originale de Blandine Schmidt</BottomNote>
    </Container>
  )
}

export default Main
