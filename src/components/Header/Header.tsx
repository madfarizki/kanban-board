import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { colors } from '../../constants'

const StyledHeader = styled.div`
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${colors.NEUTRAL._40};
`

const StyledMenu = styled.div`
  padding: 18px 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
`

interface HeaderProps {
  children: ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <StyledHeader>
      <StyledMenu>{children}</StyledMenu>
    </StyledHeader>
  )
}

export default Header
