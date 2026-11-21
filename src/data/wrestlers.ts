import { GCS } from "./site";

export type Division = "Men's" | "Women's" | "Tag Team" | "Trios" | "Personality";
export type Gender = "Male" | "Female" | "Team";

export type Wrestler = {
  slug: string;
  name: string;
  nickname: string;
  image: string;
  division: Division;
  gender: Gender;
  faction: string;
  champion: boolean;
  title?: string;
  height: string;
  weight: string;
  hometown: string;
  debut: string;
  style: string;
  finisher: string;
  signatureMoves: string[];
  championships: string[];
  bio: string;
  career: string;
  socials: { label: string; url: string }[];
};

type Row = [
  name: string,
  slug: string,
  file: string,
  division: Division,
  gender: Gender,
  faction: string,
  champion?: boolean,
  title?: string,
];

const rows: Row[] = [
  ["Adam Page", "adam-page", "2026/08/21/d4f8cd18-348e-4f40-ab94-0d75f6a8ebf0.jpg", "Men's", "Male", "The Elite", true, "AEW World Championship"],
  ["Adam Cole", "adam-cole", "2026/08/21/dbe27bc5-03e1-47b4-93a7-ce9b943f6a26.jpg", "Men's", "Male", "The Elite"],
  ["Adam Copeland", "adam-copeland", "2026/09/30/c1becee1-948e-4499-9f5c-eb70fe090c45.jpg", "Men's", "Male", "AEW Originals"],
  ["Jon Moxley", "jon-moxley", "2026/10/27/26d4cb1b-1c80-4b61-8b3e-ff249b7188c9.jpg", "Men's", "Male", "Blackpool Combat Club"],
  ["Bryan Danielson", "bryan-danielson", "2026/10/27/5eb184b7-6797-4803-a51d-f93453759dcf.jpg", "Men's", "Male", "Blackpool Combat Club"],
  ["Darby Allin", "darby-allin", "2026/10/23/5b33e1d5-5f34-4d60-b6ef-81bad0a6b4bf.jpg", "Men's", "Male", "AEW Originals"],
  ["MJF", "mjf", "2026/08/21/c1dcc270-cf43-4163-8f0c-bd0bc35d7bb8.jpg", "Men's", "Male", "The Elite"],
  ["Kenny Omega", "kenny-omega", "2026/10/27/582d4e8d-a553-4077-8598-fa263bd27ea5.jpg", "Men's", "Male", "The Elite"],
  ["Will Ospreay", "will-ospreay", "2026/08/21/0a56041d-8de2-4a89-b8ee-7658f68ecc7e.jpg", "Men's", "Male", "United Empire"],
  ["Bobby Lashley", "bobby-lashley", "2026/08/21/fd816f84-1d6f-4193-ad95-80549a1675cf.jpg", "Men's", "Male", "The Hurt Business"],
  ["Jay White", "jay-white", "2026/08/21/1a7da3cf-c78b-4184-b303-48111b179c09.jpg", "Men's", "Male", "Bullet Club Gold"],
  ["Jack Perry", "jack-perry", "2026/08/21/1f16fb67-8c51-4aff-8229-d2508e621f08.jpg", "Men's", "Male", "Bullet Club Gold"],
  ["Jay Lethal", "jay-lethal", "2026/11/19/377e5f57-e426-4c15-b643-cc0361dd29a2.jpg", "Men's", "Male", "AEW Originals"],
  [" Christian Cage", "christian-cage", "2026/09/30/5e189fa2-cf9c-4f84-865e-bacfc8b488af.jpg", "Men's", "Male", "The Patriarchy"],
  ["Eddie Kingston", "eddie-kingston", "2026/08/21/70c9db19-9bea-4d6c-8064-e933b324766a.jpg", "Men's", "Male", "AEW Originals"],
  ["Claudio Castagnoli", "claudio-castagnoli", "2026/08/21/7fe3baee-5f56-4ea6-a93b-154828601b6b.jpg", "Men's", "Male", "Blackpool Combat Club"],
  ["Daniel Garcia", "daniel-garcia", "2026/08/21/a06fcc37-c3c7-4456-9ed0-3e3ab555c106.jpg", "Men's", "Male", "AEW Originals"],
  ["Brody King", "brody-king", "2026/08/21/cd09102a-8a87-4686-b84b-c6cbbb44cc6b.jpg", "Men's", "Male", "Blackpool Combat Club"],
  ["Dustin Rhodes", "dustin-rhodes", "2026/08/21/96317693-4ada-45e2-a3e8-c75656b45afb.jpg", "Men's", "Male", "AEW Originals"],
  ["Andrade El Idolo", "andrade-el-idolo", "2026/11/08/7a86d8f2-318e-4c58-8794-a5be0a894518.jpg", "Men's", "Male", "Los Fabulosos"],
  ["Ilja Dragunov", "ilja-dragunov", "2026/10/22/bbc69bb7-263e-4a40-b895-12b68d997458.jpg", "Men's", "Male", "Independent"],
  ["Gabe Kidd", "gabe-kidd", "2026/08/21/40a75dbc-3a1b-4534-a6cf-19da7da9f2dc.jpg", "Men's", "Male", "Bullet Club War Dogs"],
  ["Bryan Keith", "bryan-keith", "2026/08/21/e229aa80-7899-4807-8063-b286ca4f305a.jpg", "Men's", "Male", "AEW Originals"],
  ["Buddy Matthews", "buddy-matthews", "2026/08/21/73282d8c-2189-4924-a39b-333ae79f9224.jpg", "Men's", "Male", "House of Black"],
  ["Brian Cage", "brian-cage", "2026/08/21/6d932f0e-ddd9-461a-ba9f-2283bff503ef.jpg", "Men's", "Male", "The Don Callis Family"],
  ["Bandido", "bandido", "2026/08/21/235f34f4-c8d4-47d7-81b8-5e145650a5b2.jpg", "Men's", "Male", "AAA"],
  ["Hologram", "hologram", "2026/08/21/1689cc86-a1f6-4e2e-b4f8-976f0520d034.jpg", "Men's", "Male", "AAA"],
  ["Hechicero", "hechicero", "2026/08/21/97eca411-3f9d-4aaa-8c43-9cecb8368159.jpg", "Men's", "Male", "CMLL"],
  ["Dralistico", "dralistico", "2026/08/21/8a2f6e0e-2ead-48c3-b591-facc690005c9.jpg", "Men's", "Male", "La Facción Ingobernable"],
  ["HOOK", "hook", "2026/08/21/23d5bdd8-13a6-441e-9961-5f6a7951ccdf.jpg", "Men's", "Male", "AEW Originals"],
  ["Ace Austin", "ace-austin", "2026/08/21/a1d3d22e-b88e-4a13-b332-1fd3bee1c09c.jpg", "Men's", "Male", "The Don Callis Family"],
  ["Action Andretti", "action-andretti", "2026/10/27/f60b5d9b-956a-4139-9a1b-251a344fab31.jpg", "Men's", "Male", "AEW Originals"],
  ["Alec Price", "alec-price", "2026/08/21/9f72c3ba-fda6-4015-a20b-9a693bbae655.jpg", "Men's", "Male", "Independent"],
  ["Aaron Solo", "aaron-solo", "2026/08/21/181b53d9-fef0-44e3-b341-42bcabba925c.jpg", "Men's", "Male", "AEW Originals"],
  ["AR Fox", "ar-fox", "2026/08/21/a83f70f1-a984-4e81-a816-b70af1734627.jpg", "Men's", "Male", "Independent"],
  ["Anthony Bowens", "anthony-bowens", "2026/08/21/3c3cf05c-df39-401d-80e9-9713ea8d6319.jpg", "Men's", "Male", "The Acclaimed"],
  ["Angelo Parker", "angelo-parker", "2026/08/21/1368321a-1978-4d45-ba56-d1c52e7b554d.jpg", "Men's", "Male", "The Jericho Appreciation Society"],
  ["Austin Gunn", "austin-gunn", "2026/08/21/3a6926f3-6896-4ec8-b5e9-5fe74abda90a.jpg", "Men's", "Male", "Bullet Club Gold"],
  ["Cash Wheeler", "cash-wheeler", "2026/08/21/cfdcca3b-5a0e-4b92-9e9c-12976b40352c.jpg", "Tag Team", "Male", "FTR"],
  ["Dax Harwood", "dax-harwood", "2026/08/21/22c9cca8-fbad-4b87-b7a4-94c0f250b484.jpg", "Tag Team", "Male", "FTR"],
  ["Dante Martin", "dante-martin", "2026/08/21/9fc7a82b-eb52-412e-86ac-d4321be349d3.jpg", "Tag Team", "Male", "Top Flight"],
  ["Darius Martin", "darius-martin", "2026/08/21/b13a225b-8abe-4a74-8e93-5459202529de.jpg", "Tag Team", "Male", "Top Flight"],
  ["Isiah Kassidy", "isiah-kassidy", "2026/08/21/93343a44-0b30-4866-be0f-a03f0650dc21.jpg", "Tag Team", "Male", "Private Party"],
  ["Colten Gunn", "colten-gunn", "2026/08/21/aaf674a4-e94b-4474-bb91-6e0f948eed91.jpg", "Tag Team", "Male", "Bullet Club Gold"],
  ["John Silver", "john-silver", "2026/08/21/51376baa-8101-42f9-a6b7-082ff8b99f91.jpg", "Tag Team", "Male", "The Dark Order"],
  ["Evil Uno", "evil-uno", "2026/08/21/92267364-fb9f-44ab-a432-cb444965cf7b.jpg", "Tag Team", "Male", "The Dark Order"],
  ["Jeff Jarrett", "jeff-jarrett", "2026/08/21/6988e669-c737-47dc-ab1d-9799e56415a9.jpg", "Men's", "Male", "AEW Originals"],
  ["Johnny TV", "johnny-tv", "2026/08/21/a12aefab-80aa-4d8a-b58b-a117b7904546.jpg", "Men's", "Male", "The Don Callis Family"],
  ["Chris Sabin", "chris-sabin", "2026/08/21/597d9b7f-6923-4bc9-8486-3c1be72bc02a.jpg", "Tag Team", "Male", "The Motor City Machine Guns"],
  ["Alex Shelley", "alex-shelley", "2026/08/21/29fd4918-eb45-4d91-af32-8f22b6eb794e.jpg", "Tag Team", "Male", "The Motor City Machine Guns"],
  ["Britt Baker D.M.D", "britt-baker", "2026/08/21/d94a4934-7755-46d1-9e9e-7ef36a094eb9.jpg", "Women's", "Female", "AEW Originals"],
  ["Hikaru Shida", "hikaru-shida", "2026/09/14/0a4d6900-06d1-44bc-9a4a-b893bfe68d36.jpg", "Women's", "Female", "AEW Originals", true, "AEW Women's World Championship"],
  ["Jamie Hayter", "jamie-hayter", "2026/11/15/adfbf18d-0fd2-43c8-9cc6-db43fabaab0b.jpg", "Women's", "Female", "AEW Originals"],
  ["Anna Jay", "anna-jay", "2026/08/21/cfb7b203-6e56-4e02-8fbc-5cec974afad3.jpg", "Women's", "Female", "The Dark Order"],
  ["Athena", "athena", "2026/08/21/b3ab2fd2-2fe6-4975-9159-244169714b54.jpg", "Women's", "Female", "AEW Originals"],
  ["Deonna Purrazzo", "deonna-purrazzo", "2026/08/21/d35bc84f-7ac4-4067-9513-b276290a0ae0.jpg", "Women's", "Female", "Independent"],
  ["Harley Cameron", "harley-cameron", "2026/08/21/f7c2d5c4-28cf-498a-b8bf-4f3da9213b63.jpg", "Women's", "Female", "AEW Originals"],
  ["Alex Windsor", "alex-windsor", "2026/11/15/c930208f-38da-439a-bad5-fd71f02e837d.jpg", "Women's", "Female", "Independent"],
  ["Dani Luna", "dani-luna", "2026/10/22/3585bcab-eddb-43eb-a840-68d86bc9b2c2.jpg", "Women's", "Female", "Independent"],
  ["Diamante", "diamante", "2026/08/21/7bf0e402-4dc4-45ca-970d-828e541e0275.jpg", "Women's", "Female", "AEW Originals"],
  ["Emi Sakura", "emi-sakura", "2026/08/21/9b761649-bd4c-4ec9-bf6d-826f905f3cf6.jpg", "Women's", "Female", "AEW Originals"],
  ["Carlie Bravo", "carlie-bravo", "2026/08/21/55dc79b6-6ac5-4268-96d4-652fe1b7c52f.jpg", "Tag Team", "Female", "The Dark Order"],
  ["Brawling Birds", "brawling-birds", "2026/09/14/3e035274-be29-4379-8fa1-f12f1749cc76.jpg", "Tag Team", "Team", "AEW Originals"],
  ["Aubrey Edwards", "aubrey-edwards", "2026/10/26/e5db1326-11da-48a7-9f50-17c542f4acf8.jpg", "Personality", "Female", "AEW Officials"],
  ["Don Callis", "don-callis", "2026/11/19/ba8793db-c263-4bc2-9b5e-cea937ac84e6.jpg", "Personality", "Male", "The Don Callis Family"],
  ["Excalibur", "excalibur", "2026/10/27/6de77721-3c4c-4618-8155-e17647bdd06f.jpg", "Personality", "Male", "AEW Broadcast Team"],
  ["Jim Ross", "jim-ross", "2026/10/27/b88fd8b8-93f8-4aba-a53d-cb8d0a615f71.jpg", "Personality", "Male", "AEW Broadcast Team"],
  ["Alicia Atout", "alicia-atout", "2026/10/27/dbef384e-71a1-4e08-bfc8-427601039ee4.jpg", "Personality", "Female", "AEW Broadcast Team"],
  ["Brandon Cutler", "brandon-cutler", "2026/08/21/76ee657d-5b70-4a90-8002-6172022ee85b.jpg", "Personality", "Male", "The Elite"],
  ["Billy Gunn", "billy-gunn", "2026/09/14/18a67c55-b60f-401d-80e8-fd83517b9cd8.jpg", "Personality", "Male", "Bullet Club Gold"],
  ["Alex Marvez", "alex-marvez", "2026/10/26/14109afb-c6c8-4104-ae55-6002760cbdc7.jpg", "Personality", "Male", "AEW Broadcast Team"],
];

const nicknames = ["The Standard", "The Opportunity", "The Icon", "The Future", "The Blueprint", "The King of Swing", "The People's Champion", "The Exact One"];
const heights = ["6'0\"", "6'2\"", "6'4\"", "5'11\"", "5'8\"", "6'6\""];
const weights = ["205 lbs", "225 lbs", "245 lbs", "190 lbs", "275 lbs", "160 lbs"];
const hometowns = ["Jacksonville, FL", "Toronto, ON", "Las Vegas, NV", "Chicago, IL", "Tokyo, JP", "London, UK", "Austin, TX"];
const debuts = ["2004", "2009", "2013", "2016", "2019", "2021"];
const styles = ["Technical / High-Flying", "Power / Brawler", "Lucha Libre", "Strong Style", "Hardcore", "All-Round"];
const finishers = ["One Second Piledriver", "The poderbomb", "Coffin Drop", "360 Splash", "Crossface Lock", "Superkick", "Fatigue"];
const movePool = ["Springboard moonsault", "Northern lights bomb", "Running knee strike", "Dragon suplex", "Tope con hilo", "Spinebuster", "Shiranui", "Slingshot DDT"];

const pick = <T,>(list: T[], index: number, salt = 0) => list[(index + salt) % list.length];

export const wrestlers: Wrestler[] = rows.map(
  ([name, slug, file, division, gender, faction, champion, title], index) => {
    const cleanName = name.trim();
    const isTeam = gender === "Team";
    const moves = [pick(movePool, index), pick(movePool, index, 2), pick(movePool, index, 4)];
    return {
      slug,
      name: cleanName,
      nickname: pick(nicknames, index, division.length),
      image: `${GCS}/${file}`,
      division,
      gender,
      faction,
      champion: Boolean(champion),
      title,
      height: isTeam ? "—" : pick(heights, index),
      weight: isTeam ? "—" : pick(weights, index, 1),
      hometown: pick(hometowns, index, 2),
      debut: pick(debuts, index, 1),
      style: pick(styles, index, gender === "Female" ? 2 : 0),
      finisher: pick(finishers, index, 3),
      signatureMoves: moves,
      championships: title
        ? [title, "AEW World Tag Team Championship"]
        : division === "Women's"
          ? ["AEW Women's World Championship", "TBS Championship"]
          : division === "Tag Team"
            ? ["AEW World Tag Team Championship"]
            : ["AEW International Championship", "TNT Championship"],
      bio: `${cleanName} is one of the most compelling competitors in All Elite Wrestling. Known for ${pick(styles, index, 4).toLowerCase()} and an undeniable connection with the AEW Universe, ${cleanName} has become a defining presence on Dynamite and Collision.`,
      career: `After rising through the independent scene, ${cleanName} signed with AEW and quickly made an impact. Now aligned with ${faction}, every appearance raises the stakes in the pursuit of championship gold.`,
      socials: [
        { label: "X", url: "https://twitter.com/AEW" },
        { label: "Instagram", url: "https://www.instagram.com/AEW/" },
        { label: "YouTube", url: "https://www.youtube.com/AEW" },
      ],
    };
  },
);

export const featuredWrestler = wrestlers[0];

export const getWrestler = (slug: string) =>
  wrestlers.find((wrestler) => wrestler.slug === slug);

export const divisions: Division[] = ["Men's", "Women's", "Tag Team", "Trios", "Personality"];
export const factions = [...new Set(wrestlers.map((wrestler) => wrestler.faction))].sort();
