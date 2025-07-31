import { useState, useEffect } from "react";
import { Howl } from "howler";
import styled from "styled-components";
import { QuizPopup } from "./components/Quiz/QuizPopup";
import {
  queenQuestions,
  morveotesiQuestions,
  turkishPop2000sQuestions,
} from "./data/questions";
import type { Question } from "./data/questions";
import { GlobalStyle } from "./components/Quiz/GlobalStyle";
import { music } from "./components/Quiz/MusicPlayer"; // <- dışa aktarılan music
import { ClappingSprite } from "./components/Quiz/ClappingSprite";

const QuizLauncher = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 80vh;
  padding: 3rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: 100vh;
    justify-content: flex-center;
    padding: 0rem 1rem 0;
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

  /* Mobile (≤599px) */
  @media (max-width: 599px) {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  /* Tablet (600px–1023px) */
  @media (min-width: 600px) and (max-width: 1023px) {
    padding: 0.75rem 1.5rem;
    font-size: 1.2rem;
  }

  /* Web (1024px–1399px) */
  @media (min-width: 1024px) and (max-width: 1399px) {
    padding: 1rem 2rem;
    font-size: 1.3rem;
  }

  /* XXL (≥1400px) */
  @media (min-width: 1400px) {
    padding: 1rem 2rem;
    font-size: 1.5rem;
  }
`;

const MuteButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ffffff;
  z-index: 1000;
`;

function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[] | null>(
    null
  );
  const [showClapSprite, setShowClapSprite] = useState(false);

  const [isMuted, setIsMuted] = useState(false);
  const toggleMute = () => {
  const newMuted = !isMuted;

  // Mute/unmute *every* Howler sound globally (background music + all SFX)
  Howler.mute(newMuted);

  setIsMuted(newMuted);
};

  // Play music when a quiz is started
  const handleQuizStart = (questions: Question[]) => {
    music.play(); // if (!isMuted) music.play(); olsaydı da olurdu. 
    // arka fonda çalmayı engellemiş de olurdu ama quizden çıkınca diğerinde 
    // fonksiyonalitesi bozuluyor. böyle bırakınca mute hala tümden deneyimi 
    // daha sağlam yapıyor bu seviyede.
    setSelectedQuestions(questions);
    setIsQuizOpen(true);
  };

  const handleQuizClose = () => {
    music.stop();
    setIsQuizOpen(false);
    setSelectedQuestions(null);
    setShowClapSprite(false); // animasyonu gizle
  };

  return (
    <>
      <GlobalStyle />
      <ClappingSprite show={showClapSprite} />
      {isQuizOpen && (
        <MuteButton onClick={toggleMute}>
          <img
            src={isMuted ? "/assets/UnmuteIcon.svg" : "/assets/MuteIcon.svg"}
            alt={isMuted ? "Unmute" : "Mute"}
            width={32}
            height={32}
          />
        </MuteButton>
      )}
      {!isQuizOpen && (
        <QuizLauncher>
          <StartButton onClick={() => handleQuizStart(queenQuestions)}>
            Queen Quiz
          </StartButton>
          <StartButton onClick={() => handleQuizStart(morveotesiQuestions)}>
            Mor ve Ötesi Quiz
          </StartButton>
          <StartButton
            onClick={() => handleQuizStart(turkishPop2000sQuestions)}
          >
            2000'ler Türk Pop Quiz
          </StartButton>
        </QuizLauncher>
      )}
      {isQuizOpen && selectedQuestions && (
        <QuizPopup
          isOpen={isQuizOpen}
          onClose={handleQuizClose}
          onFinish={() => setShowClapSprite(true)} // <- Ekle!
          questions={selectedQuestions}
        />
      )}
    </>
  );
}

export default App;
