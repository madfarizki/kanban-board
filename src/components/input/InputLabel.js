import styled from "styled-components";
import { colors } from "../../constants";

const StyledInputLabel = styled.p`
    height: 25px;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 20px;
    margin: 0 0 8px 0;
    color: ${colors.NEUTRAL._90};
`;

export default function InputLabel(props) {
    return <StyledInputLabel {...props} />;
}
