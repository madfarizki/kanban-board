import React from 'react'
import styled from 'styled-components'
import { colors } from '../../constants'

export const LABEL_COLOR = {
  PRIMARY: 'primary',
  DANGER: 'danger',
  NEUTRAL: 'neutral'
} as const

type LabelColor = keyof typeof LABEL_COLOR

interface StyledSettingMenuProps {
  color: string
}

const StyledSettingMenu = styled.div<StyledSettingMenuProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  gap: 16px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  cursor: pointer;

  color: #333333;

  &:hover {
    color: ${({ color }) => {
      let hexColor = ''
      switch (color) {
        case LABEL_COLOR.PRIMARY:
          hexColor = colors.PRIMARY.MAIN
          break
        case LABEL_COLOR.DANGER:
          hexColor = colors.DANGER.MAIN
          break
        default:
          hexColor = colors.NEUTRAL._100
      }
      return hexColor
    }};
  }
`

const StyledSettingMenuText = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  text-align: start;
  letter-spacing: 0.2px;
  flex: none;
  order: 0;
  flex-grow: 1;
  margin: 0;
`

interface SettingMenuProps {
  color: LabelColor
  icon: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}

const SettingMenu: React.FC<SettingMenuProps> = ({
  color,
  icon,
  children,
  onClick = () => {}
}) => {
  return (
    <StyledSettingMenu color={color} onClick={onClick}>
      <span style={{ fontSize: '24px' }}>{icon}</span>
      <StyledSettingMenuText>{children}</StyledSettingMenuText>
    </StyledSettingMenu>
  )
}

export default SettingMenu
