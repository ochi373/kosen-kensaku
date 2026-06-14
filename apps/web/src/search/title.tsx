import { AiSearchIcon, SchoolIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function SearchTitle() {
	return (
		<div className="relative overflow-hidden bg-slate-950 text-white">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.35),transparent_24rem),radial-gradient(circle_at_85%_15%,rgba(20,184,166,0.22),transparent_22rem)]" />
			<div className="relative mx-auto flex min-h-84 max-w-6xl flex-col justify-center px-4 py-16 sm:px-6">
				<div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-sky-100 backdrop-blur">
					<HugeiconsIcon
						icon={SchoolIcon}
						strokeWidth={1.8}
						className="size-4"
					/>
					National Institute of Technology Finder
				</div>
				<h1 className="max-w-3xl text-4xl font-black tracking-normal sm:text-5xl">
					国立高専検索サイト
				</h1>
				<p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-200 sm:text-lg">
					興味のある分野、暮らしたいエリア、学校生活のこだわりから、あなたに合う国立高専を探せます。
				</p>
				<div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
					<span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
						<HugeiconsIcon
							icon={AiSearchIcon}
							strokeWidth={1.8}
							className="size-4"
						/>
						複数選択OK
					</span>
					<span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
						学科説明つき
					</span>
				</div>
			</div>
		</div>
	);
}
