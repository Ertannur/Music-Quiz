import styled, { keyframes, css } from "styled-components";

const glowGreen = keyframes`
  0% { box-shadow: 0 0 5px #00ff88; }
  50% { box-shadow: 0 0 20px #00ff88; }
  100% { box-shadow: 0 0 5px #00ff88; }
`;

const shakeRed = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
`;

export const PopupContainer = styled.div`
  background-color: #1a1a40;
  color: #fff;
  padding: 2rem;
  border: 4px solid #00f0ff;
  font-family: 'Press Start 2P', cursive;
  width: 90%;
  max-width: 600px;
  margin: auto;
  text-align: center;
  border-radius: 12px;
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
`;

export const AnswerButton = styled.button<{
  isCorrect?: boolean;
  isWrong?: boolean;
}>`
  font-family: 'Press Start 2P', monospace;
  padding: 1rem;
  font-size: 1rem;
  background-color: #0b1c2c;
  border: 2px solid #ff66cc;
  color: #ffd447;
  box-shadow: 2px 2px 0px #000;
  cursor: pointer;

  ${({ isCorrect }) =>
    isCorrect &&
    css`
      transform: scale(1);
      animation: ${glowGreen} 0.6s ease-in-out;
      background-color: #009550ff;
      color: black;
      opacity: 1 !important;
    `}

  ${({ isWrong }) =>
    isWrong &&
    css`
      transform: scale(1);
      animation: ${shakeRed} 0.5s ease-in-out;
      background-color: #b04a4aff;
      color: white;
      opacity: 1 !important;
    `}
`;

export const Stats = styled.div`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  color: #00ff99;
`;