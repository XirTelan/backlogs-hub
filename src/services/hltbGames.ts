export default async function getHLTBGame(query: string) {
  const payload = {
    searchType: "games",
    searchTerms: [`${query}`],
    searchPage: 1,
    size: 20,
    searchOptions: {
      games: {
        userId: 0,
        platform: "",
        sortCategory: "popular",
        rangeCategory: "main",
        rangeTime: { min: null, max: null },
        gameplay: { perspective: "", flow: "", genre: "" },
        rangeYear: { min: "", max: "" },
        modifier: "",
      },
      users: { sortCategory: "postcount" },
      lists: { sortCategory: "follows" },
      filter: "",
      sort: 0,
      randomizer: 0,
    },
  };

  const res = await fetch("https://howlongtobeat.com/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://howlongtobeat.com/",
      Referer: "https://howlongtobeat.com/",
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
}
