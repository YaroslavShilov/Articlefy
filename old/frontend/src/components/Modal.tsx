import React from 'react'
import styled from 'styled-components'

interface Props {
  className?: string
  visible: boolean
  children: React.ReactNode
}

export const Modal: React.FC<Props> = ({ className, children, visible }) => (
  <StyledModal className={className} theme={{ active: visible }}>
    {children}
  </StyledModal>
)

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 80%;
  padding: 60px 30px;

  font-weight: 700;
  font-size: 22px;
  text-align: center;

  opacity: 0;
  visibility: hidden;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 0 50px 1px rgba(0, 0, 0, 0.2);

  transform: translate(-50%, -50%);
  transition: all 0.5s ease-in-out;

  ${(props) =>
    props.theme.active && {
      opacity: 1,
      visibility: 'visible',
    }}
`
