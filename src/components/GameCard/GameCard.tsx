import { hltbGameData } from "@/containers/SearchGameBar";
import Image from "next/image";
import React from "react";

export default function GameCard({ item }: GameCardProps) {
  return (
    <div>
      <div>{item.game_name}</div>
      <Image
        src={`https://howlongtobeat.com/games/${item.game_image}`}
        alt={""}
        width={100}
        height={100}
      />
    </div>
  );
}

interface GameCardProps {
  item: hltbGameData;
}
