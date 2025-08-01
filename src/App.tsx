import { GlobalStyle } from "./components/Quiz/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { useEffect } from "react";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useQuizStore } from "./stores/quizStore";
import { music } from "./components/Quiz/MusicPlayer";

function App() {
  useAudioPlayer();

  // Load quizHistory from localStorage on first mount
  useEffect(() => {
    const saved = localStorage.getItem("quizHistory");
    if (saved) {
      useQuizStore.setState({ quizHistory: JSON.parse(saved) });
    }
  }, []);

  // Ses dosyasını önceden yükle (HTML preload yerine)
  useEffect(() => {
    music.load();
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
