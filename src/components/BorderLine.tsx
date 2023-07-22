import React from 'react'
import styled from 'styled-components'
import { colors } from '../constants'

const StyledBorderLine = styled.div`
  border-bottom: 1px dashed ${colors.NEUTRAL._40};
  width: 100%;
`

export default function BorderLine() {
  return <StyledBorderLine />
}
