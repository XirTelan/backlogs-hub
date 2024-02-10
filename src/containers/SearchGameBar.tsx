"use client";
import GameCard from "@/components/GameCard";
import useDebounce from "@/hooks/useDebounce";
import React, {  useEffect, useState } from "react";

export default function SearchGameBar({ onClose }: searchGameBarProps) {
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<hltbGameData[]>();

  const debounceSearch = useDebounce(inputText);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    async function search() {
      setLoading(true);
      const data = await fetch(`/api/gameSearch?game=${debounceSearch}`).then(
        (res) => res.json(),
      );

      setResults(data.data);
      setLoading(false);
    }
    search();
  }, [debounceSearch]);

  return (
    <section>
      <div>SearchGameBar</div>
      <div className="mb-1 flex">
        <div className="flex items-center  rounded bg-slate-800 p-1">
          <input
            type="text"
            value={inputText}
            onChange={inputHandler}
            className="bg-slate-800"
          />
          {/* <div className="rounded bg-neutral-800 p-1 ms-1 text-xs">HLTB</div> */}
        </div>
        <button onClick={() => onClose()}>Close</button>
      </div>

      <div className="flex ">
        {loading && <div>Loading</div>}

        <ul className="flex flex-wrap gap-4">
          {!loading &&
            results?.map((item) => (
              <li key={item.game_id}>
                <GameCard item={item} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

interface searchGameBarProps {
  onClose: () => void;
}

export interface hltbGameData {
  game_id: number;
  game_name: string;
  game_name_date: number;
  game_alias: string;
  game_type: string;
  game_image: string;
  comp_lvl_combine: number;
  comp_lvl_sp: number;
  comp_lvl_co: number;
  comp_lvl_mp: number;
  comp_lvl_spd: number;
  comp_main: number;
  comp_plus: number;
  comp_100: number;
  comp_all: number;
  comp_main_count: number;
  comp_plus_count: number;
  comp_100_count: number;
  comp_all_count: number;
  invested_co: number;
  invested_mp: number;
  invested_co_count: number;
  invested_mp_count: number;
  count_comp: number;
  count_speedrun: number;
  count_backlog: number;
  count_review: number;
  review_score: number;
  count_playing: number;
  count_retired: number;
  profile_dev: string;
  profile_popular: number;
  profile_steam: number;
  profile_platform: string;
  release_world: number;
}
