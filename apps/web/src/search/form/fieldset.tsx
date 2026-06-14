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
						className={cn(gridColsClass, "grid gap-3")}
						data-slot="checkbox-group"
					>
						{options.map((o) => (
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
