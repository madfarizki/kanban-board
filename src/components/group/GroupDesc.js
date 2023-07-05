import styled from "styled-components";
import { colors } from "../../constants";

const StyledGroupDesc = styled.p `
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  margin: 0;
  color: ${colors.NEUTRAL._90};
`;


export default function GroupDesc({ children }) {
    return <StyledGroupDesc>{children}</StyledGroupDesc>;
}
