"use server";
import { BacklogItemCreationDTO, BacklogItemDTO } from "@/zodTypes";
import * as cheerio from "cheerio";
import { addBacklogItem } from "./backlogItem";
import { string } from "zod";

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
  //   const $ = cheerio.load(`<a
  //   class="match ds_collapse_flag"
  //   data-ds-appid="292030"
  //   data-ds-itemkey="App_292030"
  //   data-ds-tagids="[1695,122,1742,4166,5611,1684,21]"
  //   data-ds-descids="[1,5]"
  //   data-ds-crtrids="[32989758,44387619,44153544]"
  //   href="https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/?snr=1_7_15__13"
  //   ><div class="match_name">The Witcher 3: Wild Hunt</div>
  //   <div class="match_img">
  //     <img
  //       src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/capsule_sm_120.jpg?t=1721646225"
  //     />
  //   </div>
  //   <div class="match_price">$39.99</div></a
  // >
  //   <a
  //   class="match ds_collapse_flag"
  //   data-ds-appid="20920"
  //   data-ds-itemkey="App_20920"
  //   data-ds-tagids="[122,1684,5611,1742,6426,4182,1697]"
  //   data-ds-crtrids="[32989758,44387619]"
  //   href="https://store.steampowered.com/app/20920/The_Witcher_2_Assassins_of_Kings_Enhanced_Edition/?snr=1_7_15__13"
  //   ><div class="match_name">
  //     The Witcher 2: Assassins of Kings Enhanced Edition
  //   </div>
  //   <div class="match_img">
  //     <img
  //       src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/20920/capsule_sm_120.jpg?t=1721646587"
  //     />
  //   </div>
  //   <div class="match_price">$19.99</div></a
  // ><a
  //   class="match ds_collapse_flag"
  //   data-ds-appid="20900"
  //   data-ds-itemkey="App_20900"
  //   data-ds-tagids="[122,1684,1742,5611,4182,6426,19]"
  //   data-ds-crtrids="[32989758,44387619]"
  //   href="https://store.steampowered.com/app/20900/The_Witcher_Enhanced_Edition_Directors_Cut/?snr=1_7_15__13"
  //   ><div class="match_name">The Witcher: Enhanced Edition Director's Cut</div>
  //   <div class="match_img">
  //     <img
  //       src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/20900/capsule_sm_120.jpg?t=1721642153"
  //     />
  //   </div>
  //   <div class="match_price">$9.99</div></a
  // ><a
  //   class="match ds_collapse_flag"
  //   data-ds-appid="378648"
  //   data-ds-itemkey="App_378648"
  //   data-ds-tagids="[122,1695,1742,4166,21,4182,6650]"
  //   data-ds-descids="[1,5]"
  //   data-ds-crtrids="[32989758,44387619,44153544]"
  //   href="https://store.steampowered.com/app/378648/The_Witcher_3_Wild_Hunt__Blood_and_Wine/?snr=1_7_15__13"
  //   ><div class="match_name">The Witcher 3: Wild Hunt - Blood and Wine</div>
  //   <div class="match_img">
  //     <img
  //       src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/378648/capsule_sm_120.jpg?t=1670976511"
  //     />
  //   </div>
  //   <div class="match_price">$19.99</div></a
  // ><a
  //   class="match ds_collapse_flag"
  //   data-ds-appid="1284410"
  //   data-ds-itemkey="App_1284410"
  //   data-ds-tagids="[113,9,1666,122,3859,32322,9271]"
  //   data-ds-crtrids="[32989758]"
  //   href="https://store.steampowered.com/app/1284410/GWENT_The_Witcher_Card_Game/?snr=1_7_15__13"
  //   ><div class="match_name">GWENT: The Witcher Card Game</div>
  //   <div class="match_img">
  //     <img
  //       src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1284410/capsule_sm_120.jpg?t=1721648093"
  //     />
  //   </div>
  //   <div class="match_price">Free To Play</div></a
  // >
  // `);

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
  if (!data.success) console.error(data);
  return { success: true, data: data[id].data };
}

export async function addSteamGameToBacklog(appId: string, backlogId: string) {
  const res = await getSteamGameInfo(appId);
  if (!res.success || res.data[appId].success === false)
    return { success: false };

  const gameInfo = res.data;
  const newItem: BacklogItemCreationDTO = {
    backlogId: backlogId,
    title: gameInfo.name,
    category: "",
    userFields: [],
    modifiersFields: {
      steamAppId: appId,
    },
  };
  const addResult = await addBacklogItem(newItem);
}

// {
//   "1086940": {
//       "success": true,
//       "data": {
//           "type": "game",
//           "name": "Baldur's Gate 3",
//           "steam_appid": 1086940,
//           "required_age": "17",
//           "is_free": false,
//           "controller_support": "full",
//           "dlc": [
//               2378500
//           ],
//           "detailed_description": "<img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/Final_Keyart_BG3.gif?t=1721123311\" /><br><br>Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power.<br><br>Mysterious abilities are awakening inside you, drawn from a mind flayer parasite planted in your brain. Resist, and turn darkness against itself. Or embrace corruption, and become ultimate evil.<br><br>From the creators of Divinity: Original Sin 2 comes a next-generation RPG, set in the world of Dungeons &amp; Dragons.<br><br><br><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/Gather_new.gif?t=1721123311\" /><br><br>Choose from 12 classes and 11 races from the D&amp;D Player's Handbook and create your own identity, or play as an Origin hero with a hand-crafted background. Or tangle with your inner corruption as the Dark Urge, a fully customisable Origin hero with its own unique mechanics and story. Whoever you choose to be, adventure, loot, battle and romance your way across the Forgotten Realms and beyond. Gather your party. Take the adventure online as a party of up to four. <br><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/An_expansive_original_story.png?t=1721123311\" /><br><br>Abducted, infected, lost. You are turning into a monster, but as the corruption inside you grows, so does your power. That power may help you to survive, but there will be a price to pay, and more than any ability, the bonds of trust that you build within your party could be your greatest strength. Caught in a conflict between devils, deities, and sinister otherworldly forces, you will determine the fate of the Forgotten Realms together.<br><br><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/Next_Gen_new.gif?t=1721123311\" /><br><br>Forged with the new Divinity 4.0 engine, Baldur’s Gate 3 gives you unprecedented freedom to explore, experiment, and interact with a thriving world filled with characters, dangers, and deceit. A grand, cinematic narrative brings you closer to your characters than ever before. From shadow-cursed forests, to the magical caverns of the Underdark, to the sprawling city of Baldur’s Gate itself, your actions define the adventure, but your choices define your legacy. You will be remembered.  <br><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/Experience_Depth.png?t=1721123311\" /><br><br>The Forgotten Realms are a vast, detailed, and diverse world, and there are secrets to be discovered all around you – verticality is a vital part of exploration. Sneak, dip, shove, climb, and jump as you journey from the depths of the Underdark to the glittering rooftops of Baldur’s Gate. Every choice you make drives your story forward, each decision leaving your mark on the world. Define your legacy, nurture relationships and create enemies, and solve problems your way. No two playthroughs will ever be the same.<br><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/01_Bullets_points.png?t=1721123311\" /><br><ul class=\"bb_ul\">allows you to combine your forces in combat and simultaneously attack enemies, or split your party to each follow your own quests and agendas. Concoct the perfect plan together… or introduce an element of chaos when your friends least expect it. Relationships are complicated. Especially when you’ve got a parasite in your brain. </ul><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/02_Bullets_points.png?t=1721123311\" /><br><ul class=\"bb_ul\">7 unique Origin heroes offer a hand-crafted experience, each with their own unique traits, agenda, and outlook on the world. Their stories intersect with the overarching narrative, and your choices will determine whether those stories end in redemption, salvation, domination, or one of many other outcomes. Play as an Origin and enjoy their stories, or recruit them to fight alongside you. </ul><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/03_Bullets_points.png?t=1721123311\" /> <br><ul class=\"bb_ul\">based on the D&amp;D 5e ruleset. Team-based initiative, advantage and disadvantage, and roll modifiers join an advanced AI, expanded environmental interactions, and a new fluidity in combat that rewards strategy and foresight. Three difficulty settings allow you to customise the challenge of combat. Enable weighted dice to help sway the battle, or play on Tactician mode for a hardcore experience.  </ul><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/04_Bullets_points_Unprecedented.png?t=1721123311\" /> <br><ul class=\"bb_ul\">featuring 31 subraces on top of the 11 races (Human, Githyanki, Half-Orc, Dwarf, Elf, Drow, Tiefling, Halfling, Half Elf, Gnome, Dragonborn), with 46 subclasses branching out of the 12 classes. Over 600 spells and actions offer near-limitless freedom of interactivity in a hand-crafted world where exploration is rewarded, and player agency defines the journey. Our unique Character Creator features unprecedented depth of character, with reactivity that ensures whomever you are, you will leave a unique legacy behind you, all the way up to Level 12. Over 174 hours of cinematics ensure that no matter the choices you make, the cinematic experience follows your journey – every playthrough, a new cinematic journey. </ul><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/05_Bullets_points_Romances.png?t=1721123311\" /> <br><ul class=\"bb_ul\">With the looming threat of war heading to Baldur’s Gate, and a mind flayer invasion on the horizon, friendships – though not necessary – are bound to be forged on your journey. What becomes of them is up to you, as you enter real, vibrant relationships with those you meet along the way. Each companion has their own moral compass and will react to the choices you make throughout your journey. At what cost will you stick to your ideals? Will you allow love to shape your actions? The relationships made on the road to Baldur’s Gate act as moments of respite at camp as much as they add weight to the many decisions you make on your adventure. </ul> <br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/06_Bullets_points_Customise.png?t=1721123311\" /> <br><ul class=\"bb_ul\">so that when you hit ‘go live’, your stream isn’t interrupted by a bear, swear, or lack of underwear. Baldur’s Gate 3 has 3 different levels of streamer-friendly customisation. You can disable nudity and explicit content separately (or together), and you can enable Twitch integration to interact directly with your audience, just as we do at our Panel From Hell showcases! You’ll be able to stream Baldur’s Gate 3 without any problems, regardless of how you play, thanks to these options.  </ul><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/Final_Image_new.gif?t=1721123311\" />",
//           "about_the_game": "<img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/Final_Keyart_BG3.gif?t=1721123311\" /><br><br>Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power.<br><br>Mysterious abilities are awakening inside you, drawn from a mind flayer parasite planted in your brain. Resist, and turn darkness against itself. Or embrace corruption, and become ultimate evil.<br><br>From the creators of Divinity: Original Sin 2 comes a next-generation RPG, set in the world of Dungeons &amp; Dragons.<br><br><br><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/Gather_new.gif?t=1721123311\" /><br><br>Choose from 12 classes and 11 races from the D&amp;D Player's Handbook and create your own identity, or play as an Origin hero with a hand-crafted background. Or tangle with your inner corruption as the Dark Urge, a fully customisable Origin hero with its own unique mechanics and story. Whoever you choose to be, adventure, loot, battle and romance your way across the Forgotten Realms and beyond. Gather your party. Take the adventure online as a party of up to four. <br><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/An_expansive_original_story.png?t=1721123311\" /><br><br>Abducted, infected, lost. You are turning into a monster, but as the corruption inside you grows, so does your power. That power may help you to survive, but there will be a price to pay, and more than any ability, the bonds of trust that you build within your party could be your greatest strength. Caught in a conflict between devils, deities, and sinister otherworldly forces, you will determine the fate of the Forgotten Realms together.<br><br><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/Next_Gen_new.gif?t=1721123311\" /><br><br>Forged with the new Divinity 4.0 engine, Baldur’s Gate 3 gives you unprecedented freedom to explore, experiment, and interact with a thriving world filled with characters, dangers, and deceit. A grand, cinematic narrative brings you closer to your characters than ever before. From shadow-cursed forests, to the magical caverns of the Underdark, to the sprawling city of Baldur’s Gate itself, your actions define the adventure, but your choices define your legacy. You will be remembered.  <br><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/Experience_Depth.png?t=1721123311\" /><br><br>The Forgotten Realms are a vast, detailed, and diverse world, and there are secrets to be discovered all around you – verticality is a vital part of exploration. Sneak, dip, shove, climb, and jump as you journey from the depths of the Underdark to the glittering rooftops of Baldur’s Gate. Every choice you make drives your story forward, each decision leaving your mark on the world. Define your legacy, nurture relationships and create enemies, and solve problems your way. No two playthroughs will ever be the same.<br><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/01_Bullets_points.png?t=1721123311\" /><br><ul class=\"bb_ul\">allows you to combine your forces in combat and simultaneously attack enemies, or split your party to each follow your own quests and agendas. Concoct the perfect plan together… or introduce an element of chaos when your friends least expect it. Relationships are complicated. Especially when you’ve got a parasite in your brain. </ul><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/02_Bullets_points.png?t=1721123311\" /><br><ul class=\"bb_ul\">7 unique Origin heroes offer a hand-crafted experience, each with their own unique traits, agenda, and outlook on the world. Their stories intersect with the overarching narrative, and your choices will determine whether those stories end in redemption, salvation, domination, or one of many other outcomes. Play as an Origin and enjoy their stories, or recruit them to fight alongside you. </ul><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/03_Bullets_points.png?t=1721123311\" /> <br><ul class=\"bb_ul\">based on the D&amp;D 5e ruleset. Team-based initiative, advantage and disadvantage, and roll modifiers join an advanced AI, expanded environmental interactions, and a new fluidity in combat that rewards strategy and foresight. Three difficulty settings allow you to customise the challenge of combat. Enable weighted dice to help sway the battle, or play on Tactician mode for a hardcore experience.  </ul><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/04_Bullets_points_Unprecedented.png?t=1721123311\" /> <br><ul class=\"bb_ul\">featuring 31 subraces on top of the 11 races (Human, Githyanki, Half-Orc, Dwarf, Elf, Drow, Tiefling, Halfling, Half Elf, Gnome, Dragonborn), with 46 subclasses branching out of the 12 classes. Over 600 spells and actions offer near-limitless freedom of interactivity in a hand-crafted world where exploration is rewarded, and player agency defines the journey. Our unique Character Creator features unprecedented depth of character, with reactivity that ensures whomever you are, you will leave a unique legacy behind you, all the way up to Level 12. Over 174 hours of cinematics ensure that no matter the choices you make, the cinematic experience follows your journey – every playthrough, a new cinematic journey. </ul><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/05_Bullets_points_Romances.png?t=1721123311\" /> <br><ul class=\"bb_ul\">With the looming threat of war heading to Baldur’s Gate, and a mind flayer invasion on the horizon, friendships – though not necessary – are bound to be forged on your journey. What becomes of them is up to you, as you enter real, vibrant relationships with those you meet along the way. Each companion has their own moral compass and will react to the choices you make throughout your journey. At what cost will you stick to your ideals? Will you allow love to shape your actions? The relationships made on the road to Baldur’s Gate act as moments of respite at camp as much as they add weight to the many decisions you make on your adventure. </ul> <br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/06_Bullets_points_Customise.png?t=1721123311\" /> <br><ul class=\"bb_ul\">so that when you hit ‘go live’, your stream isn’t interrupted by a bear, swear, or lack of underwear. Baldur’s Gate 3 has 3 different levels of streamer-friendly customisation. You can disable nudity and explicit content separately (or together), and you can enable Twitch integration to interact directly with your audience, just as we do at our Panel From Hell showcases! You’ll be able to stream Baldur’s Gate 3 without any problems, regardless of how you play, thanks to these options.  </ul><br><img src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/extras/Final_Image_new.gif?t=1721123311\" />",
//           "short_description": "Baldur’s Gate 3 is a story-rich, party-based RPG set in the universe of Dungeons &amp; Dragons, where your choices shape a tale of fellowship and betrayal, survival and sacrifice, and the lure of absolute power.",
//           "supported_languages": "English<strong>*</strong>, French, German, Spanish - Spain, Polish, Russian, Simplified Chinese, Turkish, Portuguese - Brazil, Italian, Spanish - Latin America, Traditional Chinese, Ukrainian, Korean, Japanese<br><strong>*</strong>languages with full audio support",
//           "header_image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg?t=1721123311",
//           "capsule_image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_231x87.jpg?t=1721123311",
//           "capsule_imagev5": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_184x69.jpg?t=1721123311",
//           "website": "https://baldursgate3.game",
//           "pc_requirements": {
//               "minimum": "<strong>Minimum:</strong><br><ul class=\"bb_ul\"><li>Requires a 64-bit processor and operating system<br></li><li><strong>OS:</strong> Windows 10 64-bit<br></li><li><strong>Processor:</strong> Intel I5 4690 / AMD FX 8350<br></li><li><strong>Memory:</strong> 8 GB RAM<br></li><li><strong>Graphics:</strong> Nvidia GTX 970 / RX 480 (4GB+ of VRAM)<br></li><li><strong>DirectX:</strong> Version 11<br></li><li><strong>Storage:</strong> 150 GB available space<br></li><li><strong>Additional Notes:</strong> SSD required</li></ul>",
//               "recommended": "<strong>Recommended:</strong><br><ul class=\"bb_ul\"><li>Requires a 64-bit processor and operating system<br></li><li><strong>OS:</strong> Windows 10 64-bit<br></li><li><strong>Processor:</strong> Intel i7 8700K / AMD r5 3600<br></li><li><strong>Memory:</strong> 16 GB RAM<br></li><li><strong>Graphics:</strong> Nvidia 2060 Super / RX 5700 XT (8GB+ of VRAM)<br></li><li><strong>DirectX:</strong> Version 11<br></li><li><strong>Storage:</strong> 150 GB available space<br></li><li><strong>Additional Notes:</strong> SSD required</li></ul>"
//           },
//           "mac_requirements": {
//               "minimum": "<strong>Minimum:</strong><br><ul class=\"bb_ul\"><li><strong>OS:</strong> macOS 12 or newer<br></li><li><strong>Processor:</strong> Apple M1<br></li><li><strong>Memory:</strong> 8 GB RAM<br></li><li><strong>Graphics:</strong> Apple M1<br></li><li><strong>Storage:</strong> 150 GB available space<br></li><li><strong>Additional Notes:</strong> Min specs can run the game on low to medium settings. Splitscreen will not run at an acceptable level of performance. SSD required.</li></ul>",
//               "recommended": "<strong>Recommended:</strong><br><ul class=\"bb_ul\"><li><strong>OS:</strong> Latest macOS<br></li><li><strong>Processor:</strong> Apple M1 Pro or better<br></li><li><strong>Memory:</strong> 16 GB RAM<br></li><li><strong>Graphics:</strong> Apple M1 Pro or better<br></li><li><strong>Storage:</strong> 150 GB available space<br></li><li><strong>Additional Notes:</strong> Recommended specs can run the game on high or ultra settings. SSD required.</li></ul>"
//           },
//           "linux_requirements": {
//               "minimum": "<strong>Minimum:</strong><br><ul class=\"bb_ul\"></ul>",
//               "recommended": "<strong>Recommended:</strong><br><ul class=\"bb_ul\"></ul>"
//           },
//           "legal_notice": "© 2023 Larian Studios. All rights reserved. Larian Studios is a registered trademark of Arrakis NV, affiliate of Larian Studios Games ltd. All company names, brand names, trademarks and logos are the property of their respective owners. © 2023 Wizards of the coast. All rights reserved. Wizards of the Coast, Baldur's Gate, Dungeons & Dragons, D&D, and their respective logos are registered trademarks of Wizards of the Coast LLC.",
//           "developers": [
//               "Larian Studios"
//           ],
//           "publishers": [
//               "Larian Studios"
//           ],
//           "price_overview": {
//               "currency": "CAD",
//               "initial": 7999,
//               "final": 7999,
//               "discount_percent": 0,
//               "initial_formatted": "",
//               "final_formatted": "CDN$ 79.99"
//           },
//           "packages": [
//               907539
//           ],
//           "package_groups": [
//               {
//                   "name": "default",
//                   "title": "Buy Baldur's Gate 3",
//                   "description": "",
//                   "selection_text": "Select a purchase option",
//                   "save_text": "",
//                   "display_type": 0,
//                   "is_recurring_subscription": "false",
//                   "subs": [
//                       {
//                           "packageid": 907539,
//                           "percent_savings_text": " ",
//                           "percent_savings": 0,
//                           "option_text": "Baldur's Gate 3 - CDN$ 79.99",
//                           "option_description": "",
//                           "can_get_free_license": "0",
//                           "is_free_license": false,
//                           "price_in_cents_with_discount": 7999
//                       }
//                   ]
//               }
//           ],
//           "platforms": {
//               "windows": true,
//               "mac": true,
//               "linux": false
//           },
//           "metacritic": {
//               "score": 96,
//               "url": "https://www.metacritic.com/game/pc/baldurs-gate-3?ftag=MCD-06-10aaa1f"
//           },
//           "categories": [
//               {
//                   "id": 2,
//                   "description": "Single-player"
//               },
//               {
//                   "id": 1,
//                   "description": "Multi-player"
//               },
//               {
//                   "id": 9,
//                   "description": "Co-op"
//               },
//               {
//                   "id": 38,
//                   "description": "Online Co-op"
//               },
//               {
//                   "id": 48,
//                   "description": "LAN Co-op"
//               },
//               {
//                   "id": 22,
//                   "description": "Steam Achievements"
//               },
//               {
//                   "id": 28,
//                   "description": "Full controller support"
//               },
//               {
//                   "id": 23,
//                   "description": "Steam Cloud"
//               },
//               {
//                   "id": 43,
//                   "description": "Remote Play on TV"
//               },
//               {
//                   "id": 44,
//                   "description": "Remote Play Together"
//               },
//               {
//                   "id": 62,
//                   "description": "Family Sharing"
//               }
//           ],
//           "genres": [
//               {
//                   "id": "25",
//                   "description": "Adventure"
//               },
//               {
//                   "id": "3",
//                   "description": "RPG"
//               },
//               {
//                   "id": "2",
//                   "description": "Strategy"
//               }
//           ],
//           "screenshots": [
//               {
//                   "id": 0,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_c73bc54415178c07fef85f54ee26621728c77504.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_c73bc54415178c07fef85f54ee26621728c77504.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 1,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_73d93bea842b93914d966622104dcb8c0f42972b.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_73d93bea842b93914d966622104dcb8c0f42972b.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 2,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_cf936d31061b58e98e0c646aee00e6030c410cda.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_cf936d31061b58e98e0c646aee00e6030c410cda.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 3,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_b6a6ee6e046426d08ceea7a4506a1b5f44181543.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_b6a6ee6e046426d08ceea7a4506a1b5f44181543.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 4,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_6b8faba0f6831a406ce015648958da9612d14dbb.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_6b8faba0f6831a406ce015648958da9612d14dbb.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 5,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_8fc5eba770b4a1639b31666908bdd2bbc1aa2ae4.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_8fc5eba770b4a1639b31666908bdd2bbc1aa2ae4.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 6,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_31c13d137706fb4d9a4210513274a3ed9c3c7c96.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_31c13d137706fb4d9a4210513274a3ed9c3c7c96.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 7,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_0efa1a469a37beeb4fd0cb8e16dc99bd36357dc4.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_0efa1a469a37beeb4fd0cb8e16dc99bd36357dc4.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 8,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_387896248b42a15239a9256844b3e4bff72fbc2a.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_387896248b42a15239a9256844b3e4bff72fbc2a.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 9,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_44d30da9c3e4622b46f2978e89bda0515856eaf4.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_44d30da9c3e4622b46f2978e89bda0515856eaf4.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 10,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_f8c7fcdeccbfe77e3fad33330a464fed30f781f0.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_f8c7fcdeccbfe77e3fad33330a464fed30f781f0.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 11,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_332cd26db210d4b10df744485ecf0a9b3f2e9024.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_332cd26db210d4b10df744485ecf0a9b3f2e9024.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 12,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_b9f6f2d2ac2b7b2fe63d776e8e13c24b481a7b19.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_b9f6f2d2ac2b7b2fe63d776e8e13c24b481a7b19.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 13,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_2c576a8e563e3338826268f172c9032c84366d16.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_2c576a8e563e3338826268f172c9032c84366d16.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 14,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_d0b50351676da10c5403ec904cf7582636e65346.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_d0b50351676da10c5403ec904cf7582636e65346.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 15,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_74d11c230ebb44ff9a69b4533a7333551d5bfc6c.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_74d11c230ebb44ff9a69b4533a7333551d5bfc6c.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 16,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_1c3ff278ac430948dc31efeb1f7d2bb0466a1493.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_1c3ff278ac430948dc31efeb1f7d2bb0466a1493.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 17,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_49168eeefdfb6e6030a5aed3fd7c1a83da870a9f.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_49168eeefdfb6e6030a5aed3fd7c1a83da870a9f.1920x1080.jpg?t=1721123311"
//               },
//               {
//                   "id": 18,
//                   "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_3cc4e8cfcfb8a91d19d96f631f076d252ba2c0c4.600x338.jpg?t=1721123311",
//                   "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_3cc4e8cfcfb8a91d19d96f631f076d252ba2c0c4.1920x1080.jpg?t=1721123311"
//               }
//           ],
//           "movies": [
//               {
//                   "id": 256987424,
//                   "name": "Baldur's Gate 3 - Accolades Trailer",
//                   "thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256987424/movie.293x165.jpg?t=1702007645",
//                   "webm": {
//                       "480": "http://video.akamai.steamstatic.com/store_trailers/256987424/movie480_vp9.webm?t=1702007645",
//                       "max": "http://video.akamai.steamstatic.com/store_trailers/256987424/movie_max_vp9.webm?t=1702007645"
//                   },
//                   "mp4": {
//                       "480": "http://video.akamai.steamstatic.com/store_trailers/256987424/movie480.mp4?t=1702007645",
//                       "max": "http://video.akamai.steamstatic.com/store_trailers/256987424/movie_max.mp4?t=1702007645"
//                   },
//                   "highlight": true
//               },
//               {
//                   "id": 256961600,
//                   "name": "Baldur's Gate 3 - Launch Trailer",
//                   "thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256961600/movie.293x165.jpg?t=1695393579",
//                   "webm": {
//                       "480": "http://video.akamai.steamstatic.com/store_trailers/256961600/movie480_vp9.webm?t=1695393579",
//                       "max": "http://video.akamai.steamstatic.com/store_trailers/256961600/movie_max_vp9.webm?t=1695393579"
//                   },
//                   "mp4": {
//                       "480": "http://video.akamai.steamstatic.com/store_trailers/256961600/movie480.mp4?t=1695393579",
//                       "max": "http://video.akamai.steamstatic.com/store_trailers/256961600/movie_max.mp4?t=1695393579"
//                   },
//                   "highlight": true
//               },
//               {
//                   "id": 256957679,
//                   "name": "Baldur's Gate 3 - Release Teaser",
//                   "thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256957679/movie.293x165.jpg?t=1692294107",
//                   "webm": {
//                       "480": "http://video.akamai.steamstatic.com/store_trailers/256957679/movie480_vp9.webm?t=1692294107",
//                       "max": "http://video.akamai.steamstatic.com/store_trailers/256957679/movie_max_vp9.webm?t=1692294107"
//                   },
//                   "mp4": {
//                       "480": "http://video.akamai.steamstatic.com/store_trailers/256957679/movie480.mp4?t=1692294107",
//                       "max": "http://video.akamai.steamstatic.com/store_trailers/256957679/movie_max.mp4?t=1692294107"
//                   },
//                   "highlight": true
//               },
//               {
//                   "id": 256952190,
//                   "name": "Baldur's Gate 3 - First Look at the City",
//                   "thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256952190/movie.293x165.jpg?t=1692294111",
//                   "webm": {
//                       "480": "http://video.akamai.steamstatic.com/store_trailers/256952190/movie480_vp9.webm?t=1692294111",
//                       "max": "http://video.akamai.steamstatic.com/store_trailers/256952190/movie_max_vp9.webm?t=1692294111"
//                   },
//                   "mp4": {
//                       "480": "http://video.akamai.steamstatic.com/store_trailers/256952190/movie480.mp4?t=1692294111",
//                       "max": "http://video.akamai.steamstatic.com/store_trailers/256952190/movie_max.mp4?t=1692294111"
//                   },
//                   "highlight": true
//               },
//               {
//                   "id": 256932354,
//                   "name": "Baldur's Gate 3 - Release Date Reveal Trailer",
//                   "thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256932354/movie.293x165.jpg?t=1692294115",
//                   "webm": {
//                       "480": "http://video.akamai.steamstatic.com/store_trailers/256932354/movie480_vp9.webm?t=1692294115",
//                       "max": "http://video.akamai.steamstatic.com/store_trailers/256932354/movie_max_vp9.webm?t=1692294115"
//                   },
//                   "mp4": {
//                       "480": "http://video.akamai.steamstatic.com/store_trailers/256932354/movie480.mp4?t=1692294115",
//                       "max": "http://video.akamai.steamstatic.com/store_trailers/256932354/movie_max.mp4?t=1692294115"
//                   },
//                   "highlight": true
//               },
//               {
//                   "id": 256920587,
//                   "name": "Baldur's Gate 3 - The Game Awards Trailer",
//                   "thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/256920587/movie.293x165.jpg?t=1692294120",
//                   "webm": {
//                       "480": "http://video.akamai.steamstatic.com/store_trailers/256920587/movie480_vp9.webm?t=1692294120",
//                       "max": "http://video.akamai.steamstatic.com/store_trailers/256920587/movie_max_vp9.webm?t=1692294120"
//                   },
//                   "mp4": {
//                       "480": "http://video.akamai.steamstatic.com/store_trailers/256920587/movie480.mp4?t=1692294120",
//                       "max": "http://video.akamai.steamstatic.com/store_trailers/256920587/movie_max.mp4?t=1692294120"
//                   },
//                   "highlight": true
//               }
//           ],
//           "recommendations": {
//               "total": 566633
//           },
//           "achievements": {
//               "total": 54,
//               "highlighted": [
//                   {
//                       "name": "Descent From Avernus",
//                       "path": "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1086940/0cb31fd9ec036550a374aa702a37464a98da3bfa.jpg"
//                   },
//                   {
//                       "name": "The Plot Thickens",
//                       "path": "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1086940/628cdbbfd2e731735e4817252ce6633bf3bcd8ed.jpg"
//                   },
//                   {
//                       "name": "The City Awaits",
//                       "path": "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1086940/3c6d05ff648b66925238963a658ee307e31ff870.jpg"
//                   },
//                   {
//                       "name": "All's Well That Ends Well",
//                       "path": "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1086940/ecd435323119579216ebcffebae690ae2e5c13eb.jpg"
//                   },
//                   {
//                       "name": "Absolute Power Corrupts",
//                       "path": "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1086940/265327d387174ee2160946bcde392352ce635b88.jpg"
//                   },
//                   {
//                       "name": "Hero of the Forgotten Realms",
//                       "path": "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1086940/7648f980938af51c9f1378ec1171673fc8d8d0b4.jpg"
//                   },
//                   {
//                       "name": "Sins of the Father",
//                       "path": "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1086940/8a149aacb554742ac673bf2531955ce27f4e234c.jpg"
//                   },
//                   {
//                       "name": "Ceremorphosis",
//                       "path": "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1086940/25eb31d566013ab216bb033cdbea1851d43db6fb.jpg"
//                   },
//                   {
//                       "name": "Roleplayer",
//                       "path": "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1086940/9c1231f530788d9aa21e1a858fbb9e85e0cb64f8.jpg"
//                   },
//                   {
//                       "name": "Bedrolls and Breakfast",
//                       "path": "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1086940/47daa8cf213809978d0f2ba9b514942c864ce452.jpg"
//                   }
//               ]
//           },
//           "release_date": {
//               "coming_soon": false,
//               "date": "3 Aug, 2023"
//           },
//           "support_info": {
//               "url": "https://larian.com/support",
//               "email": ""
//           },
//           "background": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/page_bg_generated_v6b.jpg?t=1721123311",
//           "background_raw": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/page.bg.jpg?t=1721123311",
//           "content_descriptors": {
//               "ids": [
//                   1,
//                   2,
//                   5
//               ],
//               "notes": "This Game may contain content not appropriate for all ages. It contains General Mature Content, and may include Nudity or Sexual Content."
//           },
//           "ratings": {
//               "esrb": {
//                   "rating": "m",
//                   "descriptors": "Intense Violence\r\nBlood and Gore\r\nStrong Sexual Content\r\nNudity\r\nStrong Language",
//                   "use_age_gate": "true",
//                   "required_age": "17",
//                   "interactive_elements": "Users Interact"
//               },
//               "pegi": {
//                   "rating": "18",
//                   "descriptors": "Violence\r\nBad Language\r\nSex",
//                   "use_age_gate": "true",
//                   "required_age": "18"
//               },
//               "dejus": {
//                   "rating": "16",
//                   "descriptors": "Violência Extrema\r\nLinguagem imprópria\r\nNudez",
//                   "use_age_gate": "true",
//                   "required_age": "16"
//               },
//               "csrr": {
//                   "rating": "R",
//                   "descriptors": "性,\r\n暴力,\r\n不當言語",
//                   "use_age_gate": "true",
//                   "required_age": "18"
//               },
//               "usk": {
//                   "rating": "18",
//                   "descriptors": "Drastische Gewalt\r\nHorror\r\nSexuelle Inhalte",
//                   "use_age_gate": "true",
//                   "required_age": "18"
//               },
//               "steam_germany": {
//                   "rating_generated": "1",
//                   "rating": "18",
//                   "required_age": "18",
//                   "banned": "0",
//                   "use_age_gate": "0",
//                   "descriptors": "Gewalt"
//               }
//           }
//       }
//   }
// }
