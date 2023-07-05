import styled from "styled-components";
import { colors } from "../constants";
import { BsCheckCircleFill } from "react-icons/bs";

const StyledProgressBar = styled.div`
  display: flex;
  padding: 0px;
  gap: 12px;
`;

const StyledProgress = styled.div`
  position: relative;
  width: calc(100% - 25px);
  height: 16px;
`;

const StyledProgressBackground = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  border-radius: 9999px;
  background-color: ${colors.NEUTRAL._30};
`;

const StyledProgressForeground = styled.div`
  position: absolute;
  width: ${({ progress }) => {
    let width = progress;
    if (progress === -1) {
      width = 50;
    }
    return width + "%";
  }};
  left: 0px;
  top: 0%;
  bottom: 0%;
  border-radius: ${({ progress }) => {
    let rad = "9999px";
    if (progress < 100) {
      rad = "9999px 0 0 9999px";
    }
    return rad;
  }};
  background-color: ${({ progress }) => {
    let hexColor = "";
    switch (progress) {
      case -1:
        hexColor = colors.DANGER.MAIN;
        break;
      case 100:
        hexColor = colors.SUCCESS.MAIN;
        break;
      default:
        hexColor = colors.PRIMARY.MAIN;
    }
    return hexColor;
  }};
`;

const StyledProgressText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  width: 25px;
  margin: 0;
  color: ${colors.NEUTRAL._70};
`;

export default function ProgressBar({ progress = 0 }) {
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
    );
}
