import { parse as csvParse } from 'papaparse'
import rawAreas from "@/data/areas.csv?raw"

export const AREAS = csvParse(rawAreas, {
  header: true,
  skipEmptyLines: true
}).data as { value: string, label: string }[]
