import styled from "styled-components";

const Title = styled.h2`
  font-size: 2rem;
  font-weight: normal;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export default Title;
