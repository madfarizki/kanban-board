import React from 'react'
import styled from 'styled-components'
import { colors } from '../constants'
import { BsCheckCircleFill } from 'react-icons/bs'

const StyledProgressBar = styled.div`
  display: flex;
  padding: 0px;
  gap: 12px;
`

const StyledProgress = styled.div`
  position: relative;
  width: calc(100% - 25px);
  height: 16px;
`

const StyledProgressBackground = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  border-radius: 9999px;
  background-color: ${colors.NEUTRAL._30};
`

const StyledProgressForeground = styled.div<{ progress: number }>`
  position: absolute;
  width: ${({ progress }) => (progress === -1 ? '50%' : progress + '%')};
  left: 0px;
  top: 0%;
  bottom: 0%;
  border-radius: ${({ progress }) =>
    progress < 100 ? '9999px 0 0 9999px' : '9999px'};
  background-color: ${({ progress }) => {
    switch (progress) {
      case -1:
        return colors.DANGER.MAIN
      case 100:
        return colors.SUCCESS.MAIN
      default:
        return colors.PRIMARY.MAIN
    }
  }};
`

const StyledProgressText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  width: 25px;
  margin: 0;
  color: ${colors.NEUTRAL._70};
`

interface ProgressBarProps {
  progress?: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress = 0 }) => {
  return (
    <StyledProgressBar>
      <StyledProgress>
        <StyledProgressBackground />
        <StyledProgressForeground progress={progress} />
      </StyledProgress>
      <StyledProgressText>
        {progress === 100 ? (
          <BsCheckCircleFill size={16} color={colors.SUCCESS.MAIN} />
        ) : (
          `${progress > 0 ? progress : 0}%`
        )}
      </StyledProgressText>
    </StyledProgressBar>
  )
}

export default ProgressBar
