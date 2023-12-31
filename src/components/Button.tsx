import React, { ReactNode, MouseEvent } from 'react'
import styled, { css } from 'styled-components'
import { colors } from '../constants'

export const BUTTON_COLOR = {
  PRIMARY: 'primary',
  DANGER: 'danger',
  NEUTRAL: 'neutral'
}

const primaryStyles = css`
  background: ${colors.PRIMARY.MAIN};
  border: 1px solid ${colors.PRIMARY.MAIN};
  color: ${colors.NEUTRAL._10};
`

const dangerStyles = css`
  background: ${colors.DANGER.MAIN};
  border: 1px solid ${colors.DANGER.MAIN};
  color: ${colors.NEUTRAL._10};
`

const neutralStyles = css`
  background: ${colors.NEUTRAL._10};
  border: 1px solid ${colors.NEUTRAL._40};
  color: ${colors.NEUTRAL._100};
`

const StyledButton = styled.button<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 4px 16px;
  width: max-content;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  cursor: pointer;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  align-items: center;

  ${({ color }) => {
    switch (color) {
      case BUTTON_COLOR.PRIMARY:
        return primaryStyles
      case BUTTON_COLOR.DANGER:
        return dangerStyles
      default:
        return neutralStyles
    }
  }};

  &:hover {
    filter: brightness(95%);
  }
`

interface ButtonProps {
  color: string // Update to the appropriate type for 'color'
  children: ReactNode // Add type annotation for 'children'
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void // Add type annotation for 'onClick'
}

const Button: React.FC<ButtonProps> = ({
  color,
  children,
  onClick = () => {}
}) => {
  // Use 'React.FC' and provide 'ButtonProps' as the generic type
  return (
    <StyledButton color={color} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default Button
