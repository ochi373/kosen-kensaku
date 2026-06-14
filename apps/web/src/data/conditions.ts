import { parse as csvParse } from "papaparse";

import rawConditions from "@/data/conditions.csv?raw";

export const CONDITIONS = csvParse(rawConditions, {
	header: true,
	skipEmptyLines: true,
}).data as { value: string; label: string; "short-label": string }[];
