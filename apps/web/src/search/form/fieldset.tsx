"use client";

import {
	FieldGroup,
	FieldLegend,
	FieldSet,
} from "@workspace/ui/components/field";
import { cn } from "@workspace/ui/lib/utils";
import { Controller } from "react-hook-form";
import { SearchField } from "./field";
import type { useSearchForm } from "./use-form";

type Option = {
	value: string; // 文字列
	label: string;
	decription?: string;
	"short-label"?: string;
};

type Cols = 1 | 2 | 3;

type Props = {
	form: ReturnType<typeof useSearchForm>;
	id: "areas" | "subjects" | "qualifications" | "others";
	title: string;
	options: Option[];
	cols?: {
		sm: Cols;
		md: Cols;
		lg: Cols;
	};
	className?: string;
};

export function SearchFormFieldset({
	form,
	id,
	title,
	options,
	cols = {
		sm: 1,
		md: 2,
		lg: 3,
	},
	className,
}: Props) {
	const gridColsClass = getColsClass(cols);

	return (
		<Controller
			name={id}
			control={form.control}
			render={({ field, fieldState }) => (
				<FieldSet
					className={cn(
						"rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-[0_20px_70px_rgba(31,52,77,0.08)] backdrop-blur md:p-6",
						className,
					)}
				>
					<FieldLegend className="mb-4 flex items-end justify-between gap-3 text-xl font-semibold tracking-normal text-slate-950">
						<span>{title}</span>
						<span className="hidden text-xs font-medium text-slate-500 sm:inline">
							{getFieldsetCaption(id)}
						</span>
					</FieldLegend>
					<FieldGroup
						className={cn(
							id === "others" ? "gap-6" : gridColsClass,
							"grid gap-3",
						)}
						data-slot="checkbox-group"
					>
						{id === "others"
							? getConditionGroups(options).map((group) => (
									<div key={group.title} className="space-y-3">
										<div className="flex items-center gap-3">
											<div className="h-px flex-1 bg-linear-to-r from-slate-200 to-transparent" />
											<p className="shrink-0 rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">
												{group.title}
											</p>
											<div className="h-px flex-1 bg-linear-to-l from-slate-200 to-transparent" />
										</div>
										<div className={cn(gridColsClass, "grid gap-3")}>
											{group.options.map((o) => (
												<SearchField
													key={o.value}
													groupId={id}
													option={o}
													field={field}
													fieldState={fieldState}
												/>
											))}
										</div>
									</div>
								))
							: options.map((o) => (
									<SearchField
										key={o.value}
										groupId={id}
										option={o}
										field={field}
										fieldState={fieldState}
									/>
								))}
					</FieldGroup>
				</FieldSet>
			)}
		/>
	);
}

const CONDITION_GROUPS = [
	{
		title: "先端技術・専門テーマ",
		values: ["o1", "o2", "o3", "o4", "o5", "o6", "o7"],
	},
	{
		title: "学科選択・カリキュラム",
		values: ["o8", "o9", "o10", "o11", "o12", "o13", "o14"],
	},
	{
		title: "挑戦・キャリア形成",
		values: ["o15", "o16", "o20", "o24", "o25"],
	},
	{
		title: "サポート・学校生活",
		values: ["o17", "o18", "o19", "o21", "o22", "o23"],
	},
	{
		title: "入試・校風",
		values: ["o26", "o27", "o28", "o29", "o30"],
	},
] as const;

function getConditionGroups(options: Option[]) {
	const optionMap = new Map(options.map((option) => [option.value, option]));

	return CONDITION_GROUPS.map((group) => ({
		title: group.title,
		options: group.values
			.map((value) => optionMap.get(value))
			.filter((option): option is Option => Boolean(option)),
	})).filter((group) => group.options.length > 0);
}

function getFieldsetCaption(id: Props["id"]) {
	if (id === "subjects") return "興味の入口を広げて選べます";
	if (id === "areas") return "通いやすさや暮らしも大切な条件";
	if (id === "others") return "教育制度・学校生活のこだわり";
	return "";
}

function getColsClass(p: Props["cols"]) {
	if (!p) return "";

	return cn(
		getColsClassBySize(p.sm, "sm"),
		getColsClassBySize(p.md, "md"),
		getColsClassBySize(p.lg, "lg"),
	);
}

function getColsClassBySize(cols: Cols, size: "sm" | "md" | "lg") {
	if (size === "sm") {
		if (cols === 1) return "grid-cols-1";
		if (cols === 2) return "grid-cols-2";
		if (cols === 3) return "grid-cols-3";
	}

	if (size === "md") {
		if (cols === 1) return "md:grid-cols-1";
		if (cols === 2) return "md:grid-cols-2";
		if (cols === 3) return "md:grid-cols-3";
	}

	if (size === "lg") {
		if (cols === 1) return "lg:grid-cols-1";
		if (cols === 2) return "lg:grid-cols-2";
		if (cols === 3) return "lg:grid-cols-3";
	}
}
