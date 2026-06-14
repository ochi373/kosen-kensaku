import {
	FileImageIcon,
	GoogleMapsIcon,
	SquareArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { useState } from "react";
import { AREAS } from "@/data/areas";
import type { KOSEN_LIST } from "@/data/kosen";
import { KosenBadges } from "./kosen.badges";

type Props = (typeof KOSEN_LIST)[number] & {
	matchedList: string[];
	className?: string;
};

export function Kosen({ matchedList, className, ...kosen }: Props) {
	const [imageUnavailable, setImageUnavailable] = useState(!kosen.image);
	const areaLabel =
		AREAS.find((area) => area.value === kosen.area)?.label ?? kosen.area;

	return (
		<Card className={className}>
			<CardHeader className="gap-4 p-0">
				<div className="relative h-48 overflow-hidden bg-slate-900">
					{imageUnavailable ? (
						<div className="flex h-full flex-col justify-between bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.32),transparent_16rem),linear-gradient(135deg,#0f172a,#0e7490)] p-5 text-white">
							<HugeiconsIcon
								icon={FileImageIcon}
								strokeWidth={1.6}
								className="size-8 opacity-80"
							/>
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-100">
									RP Visual
								</p>
								<p className="mt-1 text-xl font-black tracking-normal">
									{kosen.name}
								</p>
							</div>
						</div>
					) : (
						<img
							className="block h-full w-full object-cover"
							src={kosen.image}
							alt={`${kosen.name}のRP資料`}
							loading="lazy"
							referrerPolicy="no-referrer"
							onError={() => setImageUnavailable(true)}
						/>
					)}
					<div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur">
						<HugeiconsIcon
							icon={GoogleMapsIcon}
							strokeWidth={1.8}
							className="size-3.5"
						/>
						{areaLabel}
					</div>
				</div>
				<div className="px-6">
					<CardTitle className="text-xl font-black tracking-normal text-slate-950">
						{kosen.name}
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="flex-1">
				<KosenBadges matchedList={matchedList} {...kosen} />
			</CardContent>
			<CardFooter>
				<a
					href={kosen.href}
					target="_blank"
					rel="noreferrer"
					className="ml-auto inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-right text-sm font-semibold text-slate-800 shadow-sm transition hover:border-sky-300 hover:text-sky-700"
				>
					公式ページへ
					<HugeiconsIcon
						icon={SquareArrowRight01Icon}
						strokeWidth={1.8}
						className="size-4"
					/>
				</a>
			</CardFooter>
		</Card>
	);
}
