import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  queenQuestions,
  morveotesiQuestions,
  turkishPop2000sQuestions,
} from "../data/questions";
import { useEffect, useRef } from "react";

const QuizLauncher = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-height: 100vh;
  padding: 3rem;
  padding-top: calc(env(safe-area-inset-top, 0px) + 1rem);
  transform: translateY(-6vh);

  @media (max-width: 1024px) {
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    padding: 0 1rem;
    transform: translateY(-3vh);
  }

  @media (max-width: 600px) {
    //padding: 0 0.5rem;
    transform: translateY(-2vh);
  }
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background-color: #241e4e;
  color: #ffe14d;
  border: 3px solid #ff66cc;
  border-radius: 10px;
  font-family: "Press Start 2P", cursive;
  cursor: pointer;
  box-shadow: 0 0 10px #ff66cc;
  transition: all 0.2s ease;

  &:hover {
    background-color: #3b2c7d;
    box-shadow: 0 0 16px #ff66cc;
    transform: scale(1.05);
  }
`;

export function StartScreen() {
  const navigate = useNavigate();
  const firstBtnRef = useRef<HTMLButtonElement | null>(null);
  const secondBtnRef = useRef<HTMLButtonElement | null>(null);
  const thirdBtnRef = useRef<HTMLButtonElement | null>(null);

  const btnRefs = [firstBtnRef, secondBtnRef, thirdBtnRef];
  // Directly navigate to /quiz and pass questions in state
  const startQuiz = (questions: typeof queenQuestions) => {
    navigate("/quiz", { state: { questions } });
  };

  useEffect(() => {
    firstBtnRef.current?.focus();
  }, []);

  const focusByIndex = (index: number) => {
    const wrapped = (index + btnRefs.length) % btnRefs.length;
    const ref = btnRefs[wrapped];
    ref.current?.focus();
  };

  const getActiveIndex = () => {
    const el = document.activeElement as HTMLElement | null;
    return btnRefs.findIndex((r) => r.current === el);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const i = getActiveIndex();
    if (i === -1) return; // odak butonlarda değilse dokunma
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      focusByIndex(i + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      focusByIndex(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusByIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusByIndex(btnRefs.length - 1);
    }
  };

  return (
    <QuizLauncher role="toolbar" aria-label="Quiz seçimi" onKeyDown={onKeyDown}>
      <StartButton
        ref={firstBtnRef}
        onClick={() => startQuiz(queenQuestions)}
        aria-label="Queen Quiz"
      >
        Queen Quiz
      </StartButton>
      <StartButton
        ref={secondBtnRef}
        onClick={() => startQuiz(morveotesiQuestions)}
        aria-label="Mor ve Ötesi Quiz"
      >
        Mor ve Ötesi Quiz
      </StartButton>
      <StartButton
        ref={thirdBtnRef}
        onClick={() => startQuiz(turkishPop2000sQuestions)}
        aria-label="2000'ler Türk Pop Quiz"
      >
        2000'ler Türk Pop Quiz
      </StartButton>
    </QuizLauncher>
  );
}
