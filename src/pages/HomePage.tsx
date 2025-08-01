import { useEffect } from "react";
import { StartScreen } from "../components/StartScreen";
import { TopBar } from "../components/TopBar";

export function HomePage() {
  useEffect(() => {
    document.title = "Musiz Quiz - Home";
  }, []);
  return (
    <>
      <TopBar />
      <StartScreen />
    </>
  );
}
