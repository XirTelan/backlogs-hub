import { hltbGameData } from "@/containers/SearchGameBar";
import Image from "next/image";
import React from "react";

export default function GameCard({ item }: GameCardProps) {
  return (
    <div className="flex w-80 max-w-80">
      <Image
        src={`https://howlongtobeat.com/games/${item.game_image}`}
        alt={""}
        width={100}
        height={0}
        className="h-auto"
      />
      <div>{item.game_name}</div>
    </div>
  );
}

interface GameCardProps {
  item: hltbGameData;
}
