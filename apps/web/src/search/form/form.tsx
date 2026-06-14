"use client";

import { AiSearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@workspace/ui/components/button";
import { createSearchParams, useNavigate } from "react-router";
import { SearchFormFieldset } from "./fieldset";
import { SELF_TEST_FORM } from "./options.constants";
import type { ConditionsSchema } from "./schema";
import { useSearchForm } from "./use-form";

export function SearchForm() {
	const form = useSearchForm();
	const navigate = useNavigate();

	const onSubmit = (d: ConditionsSchema) => {
		const search = createSearchParams({
			areas: d.areas.join(","),
			subjects: d.subjects.join(","),
			qualifications: d.qualifications.join(","),
			others: d.others.join(","),
		}).toString();

		navigate({
			pathname: "/result",
			search,
		});
	};

	return (
		<form
			className="mx-auto max-w-6xl px-4 pb-16 sm:px-6"
			onSubmit={form.handleSubmit(onSubmit)}
		>
			{SELF_TEST_FORM.map((f) => (
				<SearchFormFieldset
					key={f.id}
					form={form}
					className="mt-6 md:mt-8"
					{...f}
				/>
			))}
			<div className="sticky bottom-4 z-10 my-8 flex justify-center">
				<Button
					type="submit"
					size="lg"
					className="h-13 rounded-full bg-slate-950 px-7 text-base shadow-[0_18px_50px_rgba(15,23,42,0.25)] hover:bg-sky-700"
				>
					<HugeiconsIcon
						icon={AiSearchIcon}
						strokeWidth={1.8}
						className="size-5"
					/>
					条件に合う高専を見る
				</Button>
			</div>
		</form>
	);
}
