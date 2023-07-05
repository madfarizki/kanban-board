import styled from "styled-components";
import { colors } from "../../constants";

export const GroupLabelColors = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    DANGER: "danger",
    SUCCESS: "success",
}

const StyledGroupLabel = styled.p`
    box-sizing: border-box;
    padding: 2px 8px;
    height: 24px;
    margin: 0;
    width: max-content;
    background: ${({ color }) => {
    let hexColor = "";
    switch (color) {
        case GroupLabelColors.SECONDARY:
            hexColor = colors.SECONDARY.SURFACE;
            break;
        case GroupLabelColors.DANGER:
            hexColor = colors.DANGER.SURFACE;
            break;
        case GroupLabelColors.SUCCESS:
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
        case GroupLabelColors.SECONDARY:
            hexColor = colors.SECONDARY.BORDER;
            break;
        case GroupLabelColors.DANGER:
            hexColor = colors.DANGER.BORDER;
            break;
        case GroupLabelColors.SUCCESS:
            hexColor = colors.SUCCESS.BORDER;
            break;
        default:
            hexColor = colors.PRIMARY.BORDER;
    }
    return hexColor;
}};
    border-radius: 4px;
    color: ${({ color }) => {
    let hexColor = "";
    switch (color) {
        case GroupLabelColors.SECONDARY:
            hexColor = colors.SECONDARY.PRESSED;
            break;
        case GroupLabelColors.DANGER:
            hexColor = colors.DANGER.MAIN;
            break;
        case GroupLabelColors.SUCCESS:
            hexColor = colors.SUCCESS.MAIN;
            break;
        default:
            hexColor = colors.PRIMARY.MAIN;
    }
    return hexColor;
}};
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
`;

export default function GroupLabel(props) {
    return <StyledGroupLabel {...props} />;
}