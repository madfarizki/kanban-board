import React from 'react'
import { BiPlusCircle } from 'react-icons/bi'
import styled from 'styled-components'
import { colors } from '../../constants'

const StyledNewItemButton = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  margin: 0;

  cursor: pointer;
  display: flex;
  gap: 7px;

  align-items: center;

  color: ${colors.NEUTRAL._100};
`

interface NewItemButtonProps {
  children?: React.ReactNode
  onClick?: () => void
}

const NewItemButton: React.FC<NewItemButtonProps> = ({
  children = '',
  onClick = () => {}
}) => {
  return (
    <StyledNewItemButton onClick={onClick}>
      <BiPlusCircle size={20} />
      {children}
    </StyledNewItemButton>
  )
}

export default NewItemButton
