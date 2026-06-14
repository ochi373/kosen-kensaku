import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { type ConditionsSchema, conditionsSchema } from "./schema";

const SEARCH_FORM_STORAGE_KEY = "kosen-search-form";

const EMPTY_SEARCH_FORM_VALUES: ConditionsSchema = {
	areas: [],
	subjects: [],
	qualifications: [],
	others: [],
};

export function useSearchForm() {
	return useForm<ConditionsSchema>({
		// 今回はschemaファイルで定義した内容を使うという宣言
		resolver: valibotResolver(conditionsSchema),

		// 今回のフォームの初期値を入れる（何も選択しないので空配列）
		// ★触るのはここだけ
		defaultValues: getSavedSearchFormValues(),

		// 値の検査は「診断する」ボタンを押したときに実施するモード
		mode: "onSubmit",
	});
}

export function saveSearchFormValues(values: ConditionsSchema) {
	try {
		sessionStorage.setItem(SEARCH_FORM_STORAGE_KEY, JSON.stringify(values));
	} catch {
		// sessionStorageが使えない環境では、検索自体の動作を優先する。
	}
}

function getSavedSearchFormValues(): ConditionsSchema {
	try {
		const raw = sessionStorage.getItem(SEARCH_FORM_STORAGE_KEY);
		if (!raw) return EMPTY_SEARCH_FORM_VALUES;

		const parsed = JSON.parse(raw) as Partial<ConditionsSchema>;

		return {
			areas: getStringArray(parsed.areas),
			subjects: getStringArray(parsed.subjects),
			qualifications: getStringArray(parsed.qualifications),
			others: getStringArray(parsed.others),
		};
	} catch {
		return EMPTY_SEARCH_FORM_VALUES;
	}
}

function getStringArray(value: unknown) {
	return Array.isArray(value)
		? value.filter((item): item is string => typeof item === "string")
		: [];
}
