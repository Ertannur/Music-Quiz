

import { Howler } from "howler";
import styled, { css } from "styled-components";
import { useQuizStore } from "../stores/quizStore";


const MuteToggle = styled.button<{ $fixed?: boolean }>`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ffffff;
  z-index: 1000;
  ${({ $fixed }) =>
    $fixed
      ? css`
          position: fixed;
          top: 1.1rem;
          right: 9.5rem;
          @media (max-width: 360px) {
            right: 7rem;
          }
        `
      : css`
          position: static; /* TopBar içinde inline */
        `}
`;

export function MuteButton( { fixed = true }: { fixed?: boolean }) {
  const isMuted = useQuizStore((state) => state.isMuted);
  const setIsMuted = useQuizStore((state) => state.setIsMuted);
  const musicStarted = useQuizStore((state) => state.musicStarted);

if (!musicStarted) return null;

  const toggleMute = () => {
    const newMuted = !isMuted;
    Howler.mute(newMuted);
    setIsMuted(newMuted);
  };

  return (
    <MuteToggle $fixed={fixed} aria-label={isMuted ? "Unmute" : "Mute"} onClick={toggleMute}>
      <img
        src={isMuted ? "/assets/UnmuteIcon.svg" : "/assets/MuteIcon.svg"}
        alt={isMuted ? "Unmute" : "Mute"}
        width={32}
        height={32}
      />
    </MuteToggle>
  );
}