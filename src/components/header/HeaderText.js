import styled from "styled-components";

const StyledHeaderText = styled.h1`
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    margin: 0;
`;

export default function HeaderText({ children }) {
    return <StyledHeaderText>{children}</StyledHeaderText>;
}
