import React from 'react'
import styled from 'styled-components'
import { colors } from '../../constants'

const StyledBoxItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 16px;
  gap: 8px;
  cursor: grab;

  background: ${colors.NEUTRAL._20};
  border: 1px solid ${colors.NEUTRAL._40};
  border-radius: 4px;

  flex: none;
  align-self: stretch;
  flex-grow: 0;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${colors.NEUTRAL._70};
`

interface BoxItemProps {
  children: React.ReactNode
}

const BoxItem: React.FC<BoxItemProps> = ({ children }) => {
  return <StyledBoxItem>{children}</StyledBoxItem>
}

export default BoxItem
