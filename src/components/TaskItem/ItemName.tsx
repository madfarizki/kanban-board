import React from 'react'
import styled from 'styled-components'
import { colors } from '../../constants'

const StyledItemName = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  margin: 0;

  color: ${colors.NEUTRAL._90};
`

interface ItemNameProps {
  children: React.ReactNode
}

const ItemName: React.FC<ItemNameProps> = ({ children }) => {
  return <StyledItemName>{children}</StyledItemName>
}

export default ItemName
