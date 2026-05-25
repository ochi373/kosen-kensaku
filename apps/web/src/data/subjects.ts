import { parse as csvParse } from 'papaparse'
import rawSubjects from "@/data/subjects.csv?raw"

export const SUBJECTS = csvParse(rawSubjects, {
  header: true,
  skipEmptyLines: true
}).data as { value: string, label: string, desctiption: string }[]
