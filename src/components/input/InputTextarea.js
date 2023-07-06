import styled from "styled-components";
import { colors } from "../../constants";

const StyledInput = styled.textarea`
  box-sizing: border-box;
  padding: 8px 16px;
  gap: 10px;
  width: 100%;
  height: 88px;
  background: #ffffff;
  border: 2px solid #ededed;
  border-radius: 8px;
  flex: none;
  order: 0;
  flex-grow: 1;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${colors.NEUTRAL._90};

  &:focus {
    border-color: ${colors.PRIMARY.MAIN};
    outline: none;
  }

  &:hover:not(:focus) {
    border-color: ${colors.PRIMARY.FOCUS};
  }

  &::placeholder {
    color: ${colors.NEUTRAL._90};
    opacity: 50%;
  }
`;

export default function InputTextarea(props) {
    return <StyledInput {...props} />;
}
