import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 6px;
  margin-bottom: 7px;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-sizing:border-box;
`;

export default function Input(props) {
  return <StyledInput {...props} />
}