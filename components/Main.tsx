import React from 'react'
import styled from 'styled-components'
import { saveAs } from 'file-saver'
import Mic from './Mic'
import MicOff from './MicOff'
import Timer from './Timer'
import Footer from './Footer'
import usePrevious from '../hooks/usePrevious'
import filename from '../helpers/filename'
import RecordRTC from 'recordrtc'
import { toError } from '../helpers/errors'
// import isServer from '../helpers/isServer'
// import isServer from '../helpers/isServer'

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
const handleSetStream = async ({
  setError,
  setStream,
}: {
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>
  setStream: React.Dispatch<React.SetStateAction<MediaStream | undefined>>
}) => {
  try {
    const userMediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    })
    setStream(userMediaStream)
  } catch (error) {
    setError(toError(error))
  }
}

const handleStopRecording = ({
  recorder,
  setRecorder,
  setError,
}: {
  recorder: RecordRTC
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>
  setRecorder: React.Dispatch<React.SetStateAction<RecordRTC | undefined>>
}) => {
  try {
    const blob = recorder.getBlob()
    saveAs(blob, filename())
    recorder.destroy()
    setRecorder(undefined)
  } catch (error) {
    setError(toError(error))
  }
}

const handleSetRecorder = async ({
  recorder,
  setRecorder,
  setError,
  stream,
}: {
  recorder: RecordRTC | undefined
  setRecorder: React.Dispatch<React.SetStateAction<RecordRTC | undefined>>
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>
  stream: MediaStream | undefined
}) => {
  try {
    if (stream && !recorder) {
      const nextRecorder = new RecordRTC(stream.clone(), {
        recorderType: RecordRTC.StereoAudioRecorder,
        mimeType: 'audio/wav',
        disableLogs: true,
      })

      setRecorder(nextRecorder)
    }
  } catch (error) {
    setError(toError(error))
  }
}

const handleRecord = ({
  isRecording,
  setIsRecording,
  recorder,
  setRecorder,
  isStreamActive,
  setError,
}: {
  isRecording: boolean
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>
  recorder: RecordRTC | undefined
  setRecorder: React.Dispatch<React.SetStateAction<RecordRTC | undefined>>
  isStreamActive: boolean
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>
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
    setError(toError(error))
  }
}

function Main() {
  const [isRecording, setIsRecording] = React.useState(false)
  const [recorder, setRecorder] = React.useState<RecordRTC>()
  const [stream, setStream] = React.useState<MediaStream>()
  const [error, setError] = React.useState<Error>()
  // const recorderState = recorder.state
  const prevRecorderState = usePrevious(recorder?.state)
  const isStreamActive = Boolean(stream && stream.active)

  // set the recorder if it doesn't exist or if it's stopped
  React.useEffect(() => {
    if (
      typeof recorder == 'undefined' ||
      (recorder.state !== 'stopped' &&
        !(recorder.state === null && prevRecorderState === 'stopped'))
    ) {
      handleSetRecorder({
        recorder,
        setRecorder,
        setError,
        stream,
      })
    }
  }, [recorder, isRecording, stream, recorder?.state, prevRecorderState])

  React.useEffect(() => {
    if (recorder?.state === 'inactive' && prevRecorderState === null) {
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
    recorder?.state,
    isStreamActive,
  ])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

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
