import React, { ReactNode, MouseEvent } from 'react'
import { FiX } from 'react-icons/fi'
import styled from 'styled-components'
import { colors } from '../../constants'

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
`

const StyledModalBodyContainer = styled.div`
  width: 420px;
  min-height: 150px;
  background-color: ${colors.NEUTRAL._10};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

const StyledModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  color: ${colors.NEUTRAL._100};
`

interface ModalBodyProps {
  title: string
  children: ReactNode
  show?: boolean
  onHideModal: (value: boolean) => void
}

const ModalBody: React.FC<ModalBodyProps> = ({
  title,
  children,
  show = false,
  onHideModal
}) => {
  const handleBackdropClick = () => {
    onHideModal(false)
  }

  const handleModalClick = (e: MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <>
      {show && (
        <StyledBackdrop onClick={handleBackdropClick}>
          <StyledModalBodyContainer onClick={handleModalClick}>
            <StyledModalTitle>
              <div>{title}</div>
              <FiX
                style={{ cursor: 'pointer', fontSize: '24px' }}
                onClick={() => onHideModal(false)}
              />
            </StyledModalTitle>
            {children}
          </StyledModalBodyContainer>
        </StyledBackdrop>
      )}
    </>
  )
}

export default ModalBody
