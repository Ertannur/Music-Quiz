import styled, { css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const HistoryButtonStyled = styled.button<{ $fixed?: boolean }>`
  background: transparent;
  border: 2px solid #ff66cc;
  color: #ffd447;
  padding: 0.5rem 1rem;
  font-family: "Press Start 2P", monospace;
  font-size: 0.8rem;
  cursor: pointer;
  z-index: 1002;
  &:hover { background: #ff66cc; color: #1a1a40; }
  ${({ $fixed }) =>
    $fixed
      ? css`
          position: fixed;
          top: 1rem;
          right: 1rem;
          @media (max-width: 360px) { right: 0.5rem; }
        `
      : css`
          position: static; /* TopBar içinde inline */
        `}
`;

export function HistoryButton({ fixed = true }: { fixed?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
if (location.pathname === "/result") return null;
  return (
    <HistoryButtonStyled $fixed={fixed} aria-label="Show quiz results" onClick={() => navigate("/result")}>
      Results
    </HistoryButtonStyled>
  );
}