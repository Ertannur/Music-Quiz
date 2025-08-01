import styled from "styled-components";
import { MuteButton } from "./MuteButton";
import { HistoryButton } from "./Quiz/HistoryButton";
import React from "react";

const Bar = styled.div`
  position: fixed;
  top: 0.75rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 1100;
`;

type TopBarProps = {
  rightExtras?: React.ReactNode; // ör: <Timer .../>
};

export function TopBar({ rightExtras }: TopBarProps) {
  return (
    <Bar>
      {rightExtras /* Solda Timer */}
      <MuteButton fixed={false} />
      <HistoryButton fixed={false} />
    </Bar>
  );
}