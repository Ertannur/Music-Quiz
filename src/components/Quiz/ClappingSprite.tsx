import styled, { keyframes } from "styled-components";

const clapAnimation = keyframes`
  from { background-position: 0px 0px; }
  to   { background-position: -2480px 0px; }
`;

const Clapper = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
  width: 310px;
  height: 450px;
  background-image: url('/assets/applause_310x450_55x87offset.png');
  background-repeat: no-repeat;
  background-size: 2480px 450px;
  animation: ${clapAnimation} 0.8s steps(8) infinite;
  position: fixed;
  bottom: 1rem;
  left: 50%;
  z-index: 1500;
  transform-origin: bottom left;
  transform: translate(-25%, 0) scale(0.5);

  @media (min-width: 600px) {
    transform: translate(-25%, 0) scale(0.5);
    bottom: 1.5rem;
    left: 50%;
  }

  @media (min-width: 1024px) {
    transform: translate(-35%, 0) scale(0.7);
    bottom: 1.5rem;
    left: 50%;
  }

  @media (min-width: 1400px) {
    transform: translate(-39%, 0) scale(0.8);
    bottom: 2.5rem;
    left: 50%;
  }
`;

export const ClappingSprite = ({ show }: { show: boolean }) => {
  return <Clapper visible={show} />;
};