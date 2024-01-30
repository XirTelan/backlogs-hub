"use client";
import { useState } from "react";
import Backloglist from "./Backlogs/BacklogList";
import SearchGameBar from "./SearchGameBar";

export default function GameBacklog() {
  const [isSearchGame, setIsSearchGame] = useState(false);

  return (
    <>
      <div>GameBacklog</div>

      {isSearchGame ? (
        <SearchGameBar onClose={() => setIsSearchGame(false)} />
      ) : (
        <Backloglist
          backlogId={"Games"}
          addItem={() => setIsSearchGame(true)}
        />
      )}
    </>
  );
}
