import { useState, useEffect } from "react";
import { ClappingSprite } from "../components/Quiz/ClappingSprite";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../stores/quizStore";
import styled from "styled-components";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { TopBar } from "../components/TopBar";

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  font-family: "Press Start 2P", monospace;
  color: #ffd447;
`;

const ResultList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ResultItem = styled.li`
  margin: 0.25rem 0;
`;

const ResultText = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
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

export function ResultPage() {
  const correctCount = useQuizStore((state) => state.correctCount);
  const resetQuizState = useQuizStore((state) => state.resetQuizState);
  const quizHistory = useQuizStore((state) => state.quizHistory);
  const clearQuizHistory = useQuizStore((state) => state.clearQuizHistory);
  const navigate = useNavigate();
  const [showClapSprite, setShowClapSprite] = useState(true);

  const isTouchOnlyDevice = useMediaQuery({ query: "(pointer: coarse)" });
  const isMobile = useMediaQuery({ maxWidth: 599 }) && isTouchOnlyDevice;
  const isTablet =
    useMediaQuery({ minWidth: 600, maxWidth: 1365 }) && isTouchOnlyDevice;
  const isWeb = useMediaQuery({ minWidth: 1366 }) || !isTouchOnlyDevice;

  const maxVisibleResults = isMobile ? 3 : isTablet ? 4 : 5;

  const handleRestart = () => {
    resetQuizState();
    navigate("/");
  };

  useEffect(() => {
    document.title = `Sonuç - ${correctCount} Doğru`;
  }, [correctCount]);

  return (
    <>
      <TopBar />
      <ClappingSprite show={showClapSprite} />
      <ResultWrapper>
        <ResultText>Doğru Sayısı: {correctCount}</ResultText>
        <br />
        <h3>Önceki Denemeler</h3>
        <ResultList>
          {quizHistory.slice(0, maxVisibleResults).map((entry, i) => (
            <ResultItem key={i}>
              ✅ {entry.correct} doğru | 🏷️ {entry.quizTitle} | 📅{" "}
              {new Date(entry.timestamp).toLocaleString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Europe/Istanbul",
              })}
            </ResultItem>
          ))}
        </ResultList>
        <div>
          <ActionButton onClick={handleRestart}>
            Quiz sayfasına dön
          </ActionButton>
          <ActionButton onClick={clearQuizHistory}>
            Geçmişi Temizle
          </ActionButton>
        </div>
      </ResultWrapper>
    </>
  );
}
