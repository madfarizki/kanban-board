import styled from "styled-components";
import { colors } from "../../constants";

const StyledHeader = styled.div`
    width: 100%;
    height: 64px;
    border-bottom: 1px solid ${colors.NEUTRAL._40};
`;

const StyledMenu = styled.div`
    padding: 18px 20px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
`;

export default function Header({ children }) {
    return (
        <StyledHeader>
            <StyledMenu>{children}</StyledMenu>
        </StyledHeader>
    );
}