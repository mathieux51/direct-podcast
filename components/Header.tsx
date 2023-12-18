import React from 'react'
import styled from 'styled-components'
import Toggle from 'react-toggle'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`

type Props = {
  className?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Header: React.FC<Props> = ({ className, onChange }) => {
  return (
    <Container className={className}>
  <Toggle
    defaultChecked={false}
    icons={false}
    onChange={onChange} />
    <span>mp3</span>
    </Container>
  )
}

export default Header
