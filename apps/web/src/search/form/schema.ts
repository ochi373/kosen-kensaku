import { array, object, string, type InferOutput } from "valibot";

// フォームの項目を定義
export const conditionsSchema = object({
    areas: array(string()),
    subjects: array(string()),
    qualifications: array(string()),
    others: array(string()),
})

export type ConditionsSchema = InferOutput<typeof conditionsSchema>