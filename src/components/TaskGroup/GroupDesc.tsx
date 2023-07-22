import React from 'react'
import styled from 'styled-components'
import { colors } from '../../constants'

const StyledGroupDesc = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  margin: 0;
  color: ${colors.NEUTRAL._90};
`

interface GroupDescProps {
  children: React.ReactNode
}

const GroupDesc: React.FC<GroupDescProps> = ({ children }) => {
  return <StyledGroupDesc>{children}</StyledGroupDesc>
}

export default GroupDesc
