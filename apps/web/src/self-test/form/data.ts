import { parse } from 'papaparse'

import rawConditions from "@/data/conditions.csv?raw"
import rawCourse from "@/data/course.csv?raw"

const FORM_CONDITIONS = parse(rawConditions, {
  header: false,
  skipEmptyLines: true
}).data as { id: string, label: string }[]

const FORM_COURSE = parse(rawCourse, {
    header: false,
    skipEnptyLines: true
}).data as { id: string, name: string, desctiption: string }[]
