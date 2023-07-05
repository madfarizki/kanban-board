import styled from "styled-components";
import { colors } from "../../constants";

const StyledModalContent = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    padding: 0 24px;
    line-height: 24px;
    color: ${colors.NEUTRAL._90};
`;

export default function ModalContent({ children }) {
    return <StyledModalContent>{children}</StyledModalContent>;
}
