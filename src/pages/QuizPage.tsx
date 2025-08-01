import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { useLocation, useNavigate } from "react-router-dom";
import { QuizPopup } from "../components/Quiz/QuizPopup";
import { useEffect, useMemo, useState } from "react";
import { useQuizStore } from "../stores/quizStore";
import { music } from "../components/Quiz/MusicPlayer";
import {
  queenQuestions,
  morveotesiQuestions,
  turkishPop2000sQuestions,
} from "../data/questions";
import type { Question } from "../data/questions";

export function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  useAudioPlayer();

  const [questions, setQuestions] = useState<Question[] | null>(null);

  useEffect(() => {
    const stateQuestions = location.state?.questions;
    if (stateQuestions && stateQuestions.length > 0) {
      setQuestions(stateQuestions);
    } else {
      // Try to restore from localStorage
      const sessionRaw = localStorage.getItem("quizSession");
      if (sessionRaw) {
        try {
          const session = JSON.parse(sessionRaw);
          if (Array.isArray(session.shuffledQuestions)) {
            const validQuestions = session.shuffledQuestions.filter(
              (q: any) =>
                typeof q?.question === "string" &&
                Array.isArray(q?.options) &&
                typeof q?.answer === "string"
            );
            if (validQuestions.length) {
              setQuestions(validQuestions as Question[]);
              return;
            }
          }
        } catch {
          // Ignore JSON parse errors
        }
      }
      navigate("/");
    }
  }, [location.state, navigate]);

  let quizTitle = "Bilinmeyen Quiz";
  if (questions?.[0]?.question === queenQuestions[0].question)
    quizTitle = "Queen Quiz";
  else if (questions?.[0]?.question === morveotesiQuestions[0].question)
    quizTitle = "Mor ve Ötesi Quiz";
  else if (questions?.[0]?.question === turkishPop2000sQuestions[0].question)
    quizTitle = "2000'ler Türk Pop Quiz";

  const musicStarted = useQuizStore((state) => state.musicStarted);
  const setMusicStarted = useQuizStore((state) => state.setMusicStarted);

  useEffect(() => {
    if (!musicStarted) {
      music.play();
      setMusicStarted(true);
    }
    document.title = `${quizTitle} - Music Quiz`;
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {questions && questions.length > 0 && (
        <QuizPopup
          isOpen={true}
          questions={questions}
          onClose={() => navigate("/")}
          onFinish={() => {
            useQuizStore.getState().addQuizResult({
              correct: useQuizStore.getState().correctCount,
              duration: 0,
              quizTitle,
            });
            navigate("/result");
          }}
        />
      )}
    </>
  );
}
