import { create } from "zustand";

type QuizStore = {
  isMuted: boolean;
  setIsMuted: (value: boolean) => void;
  correctCount: number;
  incrementCorrect: () => void;
  resetQuizState: () => void;
  musicStarted: boolean;
  setMusicStarted: (value: boolean) => void;
  quizHistory: {
    correct: number;
    duration: number;
    timestamp: number;
    quizTitle: string;
  }[];
  addQuizResult: (result: {
    correct: number;
    duration: number;
    quizTitle: string;
  }) => void;
  clearQuizHistory: () => void;
};

export const useQuizStore = create<QuizStore>((set) => ({
  isMuted: false,
  setIsMuted: (value) => set({ isMuted: value }),
  correctCount: 0,
  incrementCorrect: () =>
    set((state) => ({ correctCount: state.correctCount + 1 })),
  resetQuizState: () => set({ correctCount: 0 }),
  musicStarted: false,
  setMusicStarted: (value) => set({ musicStarted: value }),
  quizHistory: [],
  addQuizResult: (result) =>
    set((state) => {
      const updated = [
        { ...result, timestamp: Date.now() },
        ...state.quizHistory,
      ];
      localStorage.setItem("quizHistory", JSON.stringify(updated));
      return { quizHistory: updated };
    }),
  clearQuizHistory: () =>
    set(() => {
      localStorage.removeItem("quizHistory");
      return { quizHistory: [] };
    }),
}));
