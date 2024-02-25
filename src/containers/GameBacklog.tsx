"use client";
import { useState } from "react";
import SearchGameBar from "./SearchGameBar";

export default function GameBacklog() {
  const [isSearchGame, setIsSearchGame] = useState(false);

  return (
    <>
      <div>GameBacklog</div>

      {isSearchGame && <SearchGameBar onClose={() => setIsSearchGame(false)} />}
    </>
  );
}
