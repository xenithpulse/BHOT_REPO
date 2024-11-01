import styled from "styled-components";

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Adjust based on where you want to position the loader */
`;

const Spinner = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.2);
  border-radius: 100%;
  border-top: 8px solid red; /* Customize the color here */
  width: 90px; /* Adjust size as needed */
  height: 90px; /* Adjust size as needed */
  animation: spin 0.3s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Loader() {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
}
