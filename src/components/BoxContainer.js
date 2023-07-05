import styled from "styled-components";
import { colors } from "../constants";

export const BoxColors = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    DANGER: "danger",
    SUCCESS: "success",
};

const StyledBox = styled.div`
  box-sizing: border-box;
  padding: 16px;
  min-width: 326px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 4px;
  gap: 8px;
  height: fit-content;

  background: ${({ color }) => {
    let hexColor = "";
    switch (color) {
        case BoxColors.SECONDARY:
            hexColor = colors.SECONDARY.SURFACE;
            break;
        case BoxColors.DANGER:
            hexColor = colors.DANGER.SURFACE;
            break;
        case BoxColors.SUCCESS:
            hexColor = colors.SUCCESS.SURFACE;
            break;
        default:
            hexColor = colors.PRIMARY.SURFACE;
    }
    return hexColor;
}};
  border: 1px solid
    ${({ color }) => {
    let hexColor = "";
    switch (color) {
        case BoxColors.SECONDARY:
            hexColor = colors.SECONDARY.BORDER;
            break;
        case BoxColors.DANGER:
            hexColor = colors.DANGER.BORDER;
            break;
        case BoxColors.SUCCESS:
            hexColor = colors.SUCCESS.BORDER;
            break;
        default:
            hexColor = colors.PRIMARY.MAIN;
    }
    return hexColor;
}};
  color: ${({ color }) => {
    let hexColor = "";
    switch (color) {
        case BoxColors.SECONDARY:
            hexColor = colors.SECONDARY.PRESSED;
            break;
        case BoxColors.DANGER:
            hexColor = colors.DANGER.MAIN;
            break;
        case BoxColors.SUCCESS:
            hexColor = colors.SUCCESS.MAIN;
            break;
        default:
            hexColor = colors.PRIMARY.MAIN;
    }
    return hexColor;
}};
`;

export default function Box({ color, children, onDrop = () => {} }) {
    return (
        <StyledBox onDrop={onDrop} color={color}>
            {children}
        </StyledBox>
    );
}
