
import { useEffect } from "react";
import { Howler } from "howler";
import { useQuizStore } from "../stores/quizStore";

export function useAudioPlayer() {
  const isMuted = useQuizStore((state) => state.isMuted);

  useEffect(() => {
    Howler.mute(isMuted);
  }, [isMuted]);
}