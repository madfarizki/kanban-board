import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { colors } from '../constants'

export const BoxColors = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
  SUCCESS: 'success'
}

const boxStyles = css`
  box-sizing: border-box;
  padding: 16px;
  min-width: 326px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 4px;
  gap: 8px;
  height: fit-content;
  font-style: normal;
  color: ${colors.PRIMARY.MAIN};
`

const primaryStyles = css`
  background: ${colors.PRIMARY.SURFACE};
  border: 1px solid ${colors.PRIMARY.MAIN};
`

const secondaryStyles = css`
  background: ${colors.SECONDARY.SURFACE};
  border: 1px solid ${colors.SECONDARY.BORDER};
  color: ${colors.SECONDARY.PRESSED};
`

const dangerStyles = css`
  background: ${colors.DANGER.SURFACE};
  border: 1px solid ${colors.DANGER.BORDER};
  color: ${colors.DANGER.MAIN};
`

const successStyles = css`
  background: ${colors.SUCCESS.SURFACE};
  border: 1px solid ${colors.SUCCESS.BORDER};
  color: ${colors.SUCCESS.MAIN};
`

const StyledBox = styled.div`
  ${boxStyles}

  ${({ color }) => {
    switch (color) {
      case BoxColors.SECONDARY:
        return secondaryStyles
      case BoxColors.DANGER:
        return dangerStyles
      case BoxColors.SUCCESS:
        return successStyles
      default:
        return primaryStyles
    }
  }};
`

interface BoxProps {
  color: string // Update to the appropriate type for 'color'
  children: ReactNode // Add type annotation for 'children'
}

const Box: React.FC<BoxProps> = ({ color, children }) => {
  return <StyledBox color={color}>{children}</StyledBox>
}

export default Box
