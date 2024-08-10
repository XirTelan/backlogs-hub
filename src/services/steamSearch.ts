"use server";
import * as cheerio from "cheerio";

const DEFAULT_VALUE = {
  cc: "US", //curency
  l: "english", //language
  f: "games",
  realm: "1",
};

const STEAM_BASE = `https://store.steampowered.com/search/suggest`;

function getSteamURL(search: string) {
  const searchParams = new URLSearchParams({ ...DEFAULT_VALUE, term: search });
  return `${STEAM_BASE}?${searchParams}`;
}

export async function searchSteamGame(search: string) {
  const res = await fetch(getSteamURL(search));
  if (!res.ok) return;
  const $ = cheerio.load(await res.text());

  const $selected = $("a");
  const data: {
    name: string;
    img: string | undefined;
    link: string;
    app_id: string;
  }[] = [];
  $selected.each((i, el) => {
    if (el.type !== "tag") return;
    const $elem = $(el);
    data.push({
      name: $elem.find(".match_name").text(),
      img: $elem.find("img").attr("src"),
      link: el.attribs["href"],
      app_id: el.attribs["data-ds-appid"],
    });
  });
  return data;
}

export async function getSteamGameInfo(id: string) {
  const appId = Number.parseInt(id);
  if (Number.isNaN(appId)) return { success: false };

  const baseUrl = `https://store.steampowered.com/api/appdetails`;
  const res = await fetch(`${baseUrl}?appids=${appId}`);
  if (!res.ok) {
    return { success: false };
  }
  const data = await res.json();
  return { success: true, data: data[id].data };
}
