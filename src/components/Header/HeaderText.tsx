import React, { ReactNode } from 'react'
import styled from 'styled-components'

const StyledHeaderText = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  margin: 0;
`

interface HeaderTextProps {
  children: ReactNode
}

const HeaderText: React.FC<HeaderTextProps> = ({ children }) => {
  return <StyledHeaderText>{children}</StyledHeaderText>
}

export default HeaderText
