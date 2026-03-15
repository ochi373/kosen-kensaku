import { array, object, string, type InferOutput } from "valibot";

// フォームの項目を定義
export const selfTestSchema = object({
    // エリア
    areas: array(string()),
    // 分野
    subjects: array(string()),
    // こだわりポイント
    others: array(string()),
})

export type SelfTestSchema = InferOutput<typeof selfTestSchema>