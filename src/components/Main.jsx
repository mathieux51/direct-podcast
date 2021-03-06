import React from 'react'
import styled from 'styled-components'
import RecordRTC from 'recordrtc'
import { saveAs } from 'file-saver'
import Mic from './Mic'
import MicOff from './MicOff'
import Timer from './Timer'
import Footer from './Footer'
import usePrevious from '../hooks/usePrevious'
// import elementInvisible from "../style/elementInvisible"

const addZero = (str) => (str.length === 1 ? `0${str}` : str)

const getFilename = () => {
  const now = new Date()
  const d = addZero(now.getDate().toString())
  const m = addZero((now.getMonth() + 1).toString())
  const y = now.getFullYear()
  const h = addZero(now.getHours().toString())
  const min = addZero(now.getMinutes().toString())
  const s = addZero(now.getSeconds().toString())

  return `${d}.${m}.${y}-${h}.${min}.${s}.wav`
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

const Form = styled.form`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledFooter = styled(Footer)`
  height: 20%;
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

const handleStopRecording = async ({ recorder, setRecorder, setError }) => {
  try {
    const blob = await recorder.getBlob()
    saveAs(blob, getFilename())
    recorder.destroy()
    setRecorder(null)
  } catch (error) {
    setError(error)
  }
}

const handleSetStream = async ({ setError, setStream }) => {
  try {
    const userMediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    })
    setStream(userMediaStream)
  } catch (error) {
    setError(error)
  }
}

const handleSetRecorder = async ({
  recorder,
  setRecorder,
  setError,
  stream,
}) => {
  try {
    if (stream && !recorder) {
      const nextRecorder = RecordRTC(stream.clone(), {
        recorderType: RecordRTC.StereoAudioRecorder,
        mimeType: 'audio/wav',
        disableLogs: true,
      })

      setRecorder(nextRecorder)
    }
  } catch (error) {
    setError(error)
  }
}

const handleRecord = async ({
  isRecording,
  setIsRecording,
  recorder,
  setRecorder,
  isStreamActive,
  setError,
}) => {
  try {
    if (!isRecording && recorder && isStreamActive) {
      setIsRecording(true)
      recorder.startRecording()
      return
    }

    setIsRecording(false)
    if (recorder) {
      recorder.stopRecording(() => {
        handleStopRecording({ recorder, setRecorder, setError })
      })
    }
  } catch (error) {
    setError(error)
  }
}

function Main() {
  const [isRecording, setIsRecording] = React.useState(false)
  const [recorder, setRecorder] = React.useState(null)
  const [stream, setStream] = React.useState(null)
  const [error, setError] = React.useState(null)
  const recorderState = recorder && recorder.state
  const prevRecorderState = usePrevious(recorderState)
  const isStreamActive = Boolean(stream && stream.active)

  React.useEffect(() => {
    if (
      recorderState !== 'stopped' &&
      !(recorderState === null && prevRecorderState === 'stopped')
    ) {
      handleSetRecorder({
        recorder,
        setRecorder,
        setError,
        stream,
      })
    }
  }, [recorder, isRecording, stream, recorderState, prevRecorderState])

  React.useEffect(() => {
    if (recorderState === 'inactive' && prevRecorderState === null) {
      handleRecord({
        isRecording,
        setIsRecording,
        recorder,
        setRecorder,
        isStreamActive,
        setError,
      })
    }
  }, [
    isRecording,
    prevRecorderState,
    recorder,
    recorderState,
    isStreamActive,
  ])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()

    // This is broken
    if (!stream) {
      handleSetStream({ setStream, setError })
      return
    }

    handleSetRecorder({
      recorder,
      setRecorder,
      setError,
      stream,
    })
    handleRecord({
      isRecording,
      setIsRecording,
      recorder,
      setRecorder,
      isStreamActive,
      setError,
    })
  }

  if (error) {
    throw error
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Button type='submit' aria-label='enregistrer'>
          {isRecording ? <StyledMic /> : <StyledMicOff />}
        </Button>
        <Timer isRecording={isRecording} />
      </Form>
      <StyledFooter />
    </Container>
  )
}

export default Main
