import { AiSearchIcon, Database02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@workspace/ui/components/button";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { match } from "./_match";
import { Kosen } from "./kosen";
import { ResultTitle } from "./title";

// 本当は診断ページから取得するべき
const PARAM_KEYS = ["areas", "subjects", "others"];

export function ResultPage() {
	const [searchParams] = useSearchParams();

	const [areas, subjects, others] = PARAM_KEYS.map((p) => {
		return getSelections(searchParams, p);
	});

	const matchedKosenList = useMemo(() => {
		return match(areas, subjects, others);
	}, [areas, subjects, others]);

	return (
		<section className="bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.14),transparent_28rem),linear-gradient(180deg,#f8fbff_0%,#eef7f7_52%,#ffffff_100%)]">
			<ResultTitle count={matchedKosenList.length} />
			{matchedKosenList.length > 0 ? (
				<div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
					{matchedKosenList.map((k) => (
						<Kosen key={k.name} className="min-w-0" {...k} />
					))}
				</div>
			) : (
				<NoData />
			)}
		</section>
	);
}

function NoData() {
	return (
		<div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
			<div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-8 text-center shadow-[0_30px_90px_rgba(31,52,77,0.12)] backdrop-blur">
				<div className="mx-auto grid size-18 place-items-center rounded-3xl bg-slate-950 text-white">
					<HugeiconsIcon
						icon={Database02Icon}
						strokeWidth={1.8}
						className="size-8"
					/>
				</div>
				<h2 className="mt-6 text-2xl font-black tracking-normal text-slate-950">
					条件に合う高専が見つかりませんでした
				</h2>
				<p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
					こだわり条件はすべて満たす学校だけを表示しています。条件を少しゆるめると、候補が見つかりやすくなります。
				</p>
				<Button
					render={<Link to="/" />}
					className="mt-7 rounded-full bg-slate-950 px-6 hover:bg-sky-700"
				>
					<HugeiconsIcon
						icon={AiSearchIcon}
						strokeWidth={1.8}
						className="size-4"
					/>
					条件を選びなおす
				</Button>
			</div>
		</div>
	);
}

function getSelections(params: URLSearchParams, paramKey: string) {
	const v = params.get(paramKey);
	return v ? v.split(",") : [];
}
