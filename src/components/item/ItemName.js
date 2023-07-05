import styled from "styled-components";
import { colors } from "../../constants";

const StyledItemName = styled.p`
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    margin: 0;

    color: ${colors.NEUTRAL._90};
`;

export default function ItemName({ children }) {
    return <StyledItemName>{children}</StyledItemName>;
}
