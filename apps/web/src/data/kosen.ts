import { parse as csvParse } from "papaparse"
import raw from "@/data/kosen.csv?raw"

type SubjectsKey = `s${number}`
type OthersKey = `o${number}`

const csv = csvParse(raw, {
  header: true,
  skipEmptyLines: true
}).data as Array<{ id: string, name: string, image: string, href: string, area: string } & { [key in SubjectsKey | OthersKey]: "○" | undefined }>

export const KOSEN_LIST = csv.map(k => {
  const subjects: SubjectsKey[] = [];
  const others: OthersKey[] = [];

  for (const [key, value] of Object.entries(k)) {
    if (value !== "○") continue;

    if (key.startsWith("s")) {
      subjects.push(key as SubjectsKey);
    } else if (key.startsWith("o")) {
      others.push(key as OthersKey);
    }
  }

  return {
    ...k,
    subjects,
    others,
  };
});
