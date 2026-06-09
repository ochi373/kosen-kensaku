import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { conditionsSchema, type ConditionsSchema } from "./schema";

export function useSearchForm() {
    return useForm<ConditionsSchema>({
        // 今回はschemaファイルで定義した内容を使うという宣言
        resolver: valibotResolver(conditionsSchema),

        // 今回のフォームの初期値を入れる（何も選択しないので空配列）
        // ★触るのはここだけ
        defaultValues: {
            areas: [],
            subjects: [],
            qualifications: [],
            others: []
        },

        // 値の検査は「診断する」ボタンを押したときに実施するモード
        mode: "onSubmit"
    })
}
