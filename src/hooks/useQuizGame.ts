import { useQuizStore } from "../stores/quizStore";
import { useState, useEffect, useRef } from "react";
import type { Question } from "../data/questions";
import { Howl } from "howler";

const sfxCorrect = new Howl({ src: ["/assets/correct-6033.mp3"], volume: 0.7 });
const sfxWrong = new Howl({ src: ["/assets/wrong-47985.mp3"], volume: 0.7 });

const LOCAL_STORAGE_KEY = "quizSession";

function questionsKey(questions: Question[]): string {
  // Identify quiz by first question text and length
  if (!questions.length) return "";
  return (
    questions[0].question +
    "|" +
    questions.length
  );
}

export function useQuizGame({
  questions,
  onFinish,
}: {
  questions: Question[];
  onFinish?: () => void;
}) {
  // State for quiz progress
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const [finished, setFinished] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Zustand quiz store for global correctCount
  const correctCount = useQuizStore((state) => state.correctCount);
  const incrementCorrect = useQuizStore((state) => state.incrementCorrect);
  const resetQuizState = useQuizStore((state) => state.resetQuizState);

  // On mount, check for persisted quiz session
  useEffect(() => {
    let restored = false;
    const sessionRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (sessionRaw) {
      try {
        const session = JSON.parse(sessionRaw);
        // Check if the saved session matches the current quiz
        if (
          session &&
          Array.isArray(session.shuffledQuestions) &&
          typeof session.currentQuestionIndex === "number" &&
          session.key === questionsKey(questions)
        ) {
          setShuffledQuestions(session.shuffledQuestions as Question[]);
          setCurrentQuestionIndex(session.currentQuestionIndex);
          restored = true;
        }
      } catch (e) {
        // ignore
      }
    }
    if (!restored) {
      // Shuffle questions and persist
      const copy = [...questions];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      setShuffledQuestions(copy);
      setCurrentQuestionIndex(0);
      // Save to localStorage
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          shuffledQuestions: copy,
          currentQuestionIndex: 0,
          key: questionsKey(questions),
        })
      );
    }
    resetQuizState();
    // eslint-disable-next-line
    // Only run on mount
    // eslint-disable-next-line
  }, [questions]);

  // On question index or shuffledQuestions change, save session
  useEffect(() => {
    // Only save if shuffledQuestions is set and has content
    if (shuffledQuestions.length > 0) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          shuffledQuestions,
          currentQuestionIndex,
          key: questionsKey(shuffledQuestions),
        })
      );
    }
  }, [shuffledQuestions, currentQuestionIndex]);

  // Shuffle options for the current question
  useEffect(() => {
    if (shuffledQuestions.length === 0) return;
    const opts = [...shuffledQuestions[currentQuestionIndex].options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    setShuffledOptions(opts);
    setSelectedOption(null);
    // Clear any running timeout (if any)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setAnimating(false);
  }, [currentQuestionIndex, shuffledQuestions]);

  const handleAnswer = (option: string) => {
    if (animating) return;
    const isCorrect =
      option === shuffledQuestions[currentQuestionIndex].answer;
    // Play sound effect for feedback
    if (isCorrect) sfxCorrect.play();
    else sfxWrong.play();
    setSelectedOption(option);
    if (isCorrect) {
      incrementCorrect();
    }
    setAnimating(true);
    // Automatically proceed to next question after feedback
    timeoutRef.current = setTimeout(() => {
      handleAnimationComplete();
    }, 800);
  };

  const handleAnimationComplete = () => {
    const isLastQuestion =
      currentQuestionIndex === shuffledQuestions.length - 1;
    if (isLastQuestion) {
      setFinished(true);
      // Remove session from localStorage
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      onFinish?.();
      return;
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setAnimating(false);
    }
  };

  const handleTimeout = () => {
    if (animating) return;
    handleAnswer(""); // Trigger wrong animation on timeout
  };

  // Cleanup any pending timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

    useEffect(() => {
   const onKeyDown = (e: KeyboardEvent) => {
     if (animating || finished) return;
     const map: Record<string, number> = { "1": 0, "2": 1, "3": 2, "4": 3 };
     const idx = map[e.key];
     if (idx == null) return;
     const opt = shuffledOptions[idx];
     if (opt) handleAnswer(opt);
   };
   window.addEventListener("keydown", onKeyDown);
   return () => window.removeEventListener("keydown", onKeyDown);
  }, [animating, finished, shuffledOptions]);

  return {
    question:
      shuffledQuestions.length > 0
        ? shuffledQuestions[currentQuestionIndex]
        : { question: "", options: [], answer: "" },
    shuffledOptions,
    currentQuestionIndex,
    correctCount,
    selectedOption,
    animating,
    finished,
    handleAnswer,
    handleTimeout,
    handleAnimationComplete,
  };
}