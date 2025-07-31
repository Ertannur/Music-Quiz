import React, { useState, useMemo, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import type { Question } from "../../data/questions";
import { Timer } from "./Timer";
import { ButtonGrid, AnswerButton, Stats } from "./styles";

import { Howl } from "howler";

const sfxCorrect = new Howl({ src: ["/assets/correct-6033.mp3"], volume: 0.7 });
const sfxWrong = new Howl({ src: ["/assets/wrong-47985.mp3"], volume: 0.7 });

type QuizPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  onFinish?: () => void; // <- bunu ekle
};

const BackButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: transparent;
  border: 2px solid #ff66cc;
  color: #ffd447;
  padding: 0.5rem 1rem;
  font-family: "Press Start 2P", monospace;
  font-size: 0.8rem;
  cursor: pointer;
  z-index: 1002;

  &:hover {
    background: #ff66cc;
    color: #1a1a40;
  }
`;

const TimerWrapper = styled.div`
  position: fixed;
  top: 1rem;
  right: 3.5rem;
  z-index: 1001;
`;

const GameArea = styled.div`
  position: relative;
  background: transparent;
  padding: 1.5rem;
  border: 4px solid #ff66cc;
  border-radius: 8px;
  text-align: center;
  color: #ffd447;
  box-shadow: 0 0 20px #c4529e;
  overflow-y: auto;

  h2 {
    color: #ffd447;
  }

  ${AnswerButton} {
    color: #ffd447;
    border: 2px solid #ff66cc;

    &:disabled {
      opacity: 0.6;
    }
  }

  @media (min-width: 1025px) {
    /* Removed max-width. Use width from above. */

    padding: 1rem 2rem;
    border-width: 3px;
    margin: 15vh auto 10vh;
    width: min(90vw, 900px);
  }

  @media (min-width: 1600px) {
    /* Removed max-width, margin-bottom, margin-top. Use width and adjust margin-top. */
    max-height: 80vh;
    padding: 1rem 2rem;
    border-width: 3px;
    margin: 15vh auto 10vh;
    width: min(90vw, 1400px);
  }

  @media (max-width: 1024px) {
    /* Removed max-width, use width. */
    padding: 1rem;
    border-width: 3px;
    margin: 16vh auto 10vh;
    width: min(85vw, 600px);
  }

  @media (max-width: 600px) {
    /* Removed max-width, use width. */
    padding: 0.75rem;
    border-width: 2px;
    margin: 12vh auto 10vh;
    width: min(90vw, 300px);

    h2 {
      font-size: 1rem;
    }

    ${AnswerButton} {
      font-size: 0.8rem;
      padding: 0.5rem;
    }
  }
`;

const ResultContainer = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #1a1a40;
  padding: 2rem;
  border: 4px solid #00f0ff;
  border-radius: 12px;
  text-align: center;
  color: #ffd447;
  font-family: "Press Start 2P", monospace;
  z-index: 1003;
`;
const ResultButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  font-family: "Press Start 2P", monospace;
  border: 2px solid #ff66cc;
  background: transparent;
  color: #ffd447;
  cursor: pointer;
  &:hover {
    background: #ff66cc;
    color: #1a1a40;
  }
`;

export const QuizPopup: React.FC<QuizPopupProps> = ({
  isOpen,
  onClose,
  questions,
  onFinish,
}) => {
  const shuffledQuestions = useMemo(() => {
    const copy = [...questions];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, [questions]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [finished, setFinished] = useState(false);

  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle answer options
    const opts = [...shuffledQuestions[currentQuestion].options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    setShuffledOptions(opts);
    // Reset selection for new question
    setSelectedOption(null);
  }, [currentQuestion, shuffledQuestions]);

  const handleAnswer = (option: string) => {
    if (animating) return;
    const isCorrect = option === shuffledQuestions[currentQuestion].answer;
    // Play sound effect for feedback
    if (isCorrect) sfxCorrect.play();
    else sfxWrong.play();
    setSelectedOption(option);
    setResult(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
    setAnimating(true);
    // Automatically proceed to next question after feedback
    setTimeout(() => {
      handleAnimationComplete();
    }, 800);
  };

  const handleAnimationComplete = () => {
    const isLastQuestion = currentQuestion === shuffledQuestions.length - 1;
    if (isLastQuestion) {
      setFinished(true);
      onFinish?.(); // <- Quiz bittiğinde clapping sprite’ı tetikle
      return;
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setResult(null);
      setAnimating(false);
    }
  };

  const handleTimeout = () => {
    if (animating) return;
    handleAnswer(""); // Trigger wrong animation on timeout
  };

  const question = shuffledQuestions[currentQuestion];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: "7rem",
        },
        content: {
          background: "transparent",
          border: "none",
          padding: 0,
          inset: "auto",
        },
      }}
    >
      {finished && (
        <>
          <ResultContainer>
            <h2>Quiz Tamamlandı!</h2>
            <p>
              Doğru sayısı: {correctCount} / {shuffledQuestions.length}
            </p>
            <ResultButton onClick={onClose}>Tamam</ResultButton>
          </ResultContainer>
        </>
      )}
      {!finished && (
        <>
          <TimerWrapper>
            {!animating && <Timer duration={60} onExpire={handleTimeout} />}
          </TimerWrapper>
          <GameArea>
            <BackButton onClick={onClose}>BACK</BackButton>
            <h2>{question.question}</h2>
            <ButtonGrid>
              {shuffledOptions.map((opt, i) => (
                <AnswerButton
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selectedOption}
                  isCorrect={selectedOption === opt && opt === question.answer}
                  isWrong={selectedOption === opt && opt !== question.answer}
                >
                  {opt}
                </AnswerButton>
              ))}
            </ButtonGrid>
            <Stats>
              <span>✔️ {correctCount}</span>
              <span>
                {currentQuestion + 1}/{shuffledQuestions.length}
              </span>
            </Stats>
          </GameArea>
        </>
      )}
    </Modal>
  );
};
