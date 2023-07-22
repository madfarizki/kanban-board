import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { colors } from '../../constants'

const StyledModalContent = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  padding: 0 24px;
  line-height: 24px;
  color: ${colors.NEUTRAL._90};
`

interface ModalContentProps {
  children: ReactNode
}

const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
  return <StyledModalContent>{children}</StyledModalContent>
}

export default ModalContent
