import styled, { css } from "styled-components";
import { colors } from "../../constants";

export const GroupLabelColors = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    DANGER: "danger",
    SUCCESS: "success",
};

const labelStyles = css`
  box-sizing: border-box;
  padding: 2px 8px;
  height: 24px;
  margin: 0;
  width: max-content;
  border-radius: 4px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
`;

const primaryStyles = css`
  background: ${colors.PRIMARY.SURFACE};
  border: 1px solid ${colors.PRIMARY.BORDER};
  color: ${colors.PRIMARY.MAIN};
`;

const secondaryStyles = css`
  background: ${colors.SECONDARY.SURFACE};
  border: 1px solid ${colors.SECONDARY.BORDER};
  color: ${colors.SECONDARY.PRESSED};
`;

const dangerStyles = css`
  background: ${colors.DANGER.SURFACE};
  border: 1px solid ${colors.DANGER.BORDER};
  color: ${colors.DANGER.MAIN};
`;

const successStyles = css`
  background: ${colors.SUCCESS.SURFACE};
  border: 1px solid ${colors.SUCCESS.BORDER};
  color: ${colors.SUCCESS.MAIN};
`;

const StyledGroupLabel = styled.p`
  ${labelStyles}

  ${({ color }) => {
    switch (color) {
        case GroupLabelColors.SECONDARY:
            return secondaryStyles;
        case GroupLabelColors.DANGER:
            return dangerStyles;
        case GroupLabelColors.SUCCESS:
            return successStyles;
        default:
            return primaryStyles;
    }
}};
`;

export default function GroupLabel(props) {
    return <StyledGroupLabel {...props} />;
}
