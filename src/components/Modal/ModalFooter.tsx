import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { colors } from '../../constants'

const StyledModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 24px;
  gap: 10px;
  background: ${colors.NEUTRAL._10};
  border-radius: 0 0 10px 10px;
`

interface ModalFooterProps {
  children: ReactNode
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return <StyledModalFooter>{children}</StyledModalFooter>
}

export default ModalFooter
