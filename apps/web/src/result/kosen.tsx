import {
	Cancel01Icon,
	FileImageIcon,
	GoogleMapsIcon,
	ImageActualSizeIcon,
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
import { useEffect, useState } from "react";
import { AREAS } from "@/data/areas";
import type { KOSEN_LIST } from "@/data/kosen";
import { KosenBadges } from "./kosen.badges";

type Props = (typeof KOSEN_LIST)[number] & {
	matchedList: string[];
	className?: string;
};

export function Kosen({ matchedList, className, ...kosen }: Props) {
	const [imageUnavailable, setImageUnavailable] = useState(!kosen.image);
	const [isImageOpen, setIsImageOpen] = useState(false);
	const areaLabel =
		AREAS.find((area) => area.value === kosen.area)?.label ?? kosen.area;
	const canOpenImage = Boolean(kosen.image) && !imageUnavailable;

	useEffect(() => {
		if (!isImageOpen) return;

		const { overflow } = document.body.style;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = overflow;
		};
	}, [isImageOpen]);

	return (
		<>
			<Card className={className}>
				<CardHeader className="gap-4 p-0">
					<button
						type="button"
						className="group relative h-48 overflow-hidden bg-slate-900 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-sky-400"
						onClick={() => {
							if (canOpenImage) setIsImageOpen(true);
						}}
						disabled={!canOpenImage}
						aria-label={`${kosen.name}のRP資料を拡大表示`}
					>
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
						{canOpenImage ? (
							<div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-slate-950/75 to-transparent p-4 text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
								<span className="text-xs font-semibold">クリックで拡大</span>
								<span className="grid size-9 place-items-center rounded-full bg-white/90 text-slate-950 shadow">
									<HugeiconsIcon
										icon={ImageActualSizeIcon}
										strokeWidth={1.8}
										className="size-4"
									/>
								</span>
							</div>
						) : null}
					</button>
					<div className="flex items-start justify-between gap-3 px-6">
						<CardTitle className="min-w-0 text-xl font-black tracking-normal text-slate-950">
							{kosen.name}
						</CardTitle>
						<div className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-800 ring-1 ring-sky-100">
							<HugeiconsIcon
								icon={GoogleMapsIcon}
								strokeWidth={1.8}
								className="size-3.5"
							/>
							{areaLabel}
						</div>
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
						公式HPへ
						<HugeiconsIcon
							icon={SquareArrowRight01Icon}
							strokeWidth={1.8}
							className="size-4"
						/>
					</a>
				</CardFooter>
			</Card>
			{isImageOpen && canOpenImage ? (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/82 p-3 backdrop-blur-sm sm:p-6"
					role="dialog"
					aria-modal="true"
					aria-label={`${kosen.name}のRP資料`}
				>
					<button
						type="button"
						className="absolute inset-0 cursor-default"
						onClick={() => setIsImageOpen(false)}
						aria-label="拡大表示を閉じる"
					/>
					<div className="relative flex h-[92dvh] w-[96vw] max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-950/40">
						<div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3">
							<div>
								<p className="text-sm font-bold text-slate-950">{kosen.name}</p>
								<p className="text-xs font-medium text-slate-500">RP資料</p>
							</div>
							<button
								type="button"
								className="grid size-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
								onClick={() => setIsImageOpen(false)}
								aria-label="拡大表示を閉じる"
							>
								<HugeiconsIcon
									icon={Cancel01Icon}
									strokeWidth={1.8}
									className="size-4"
								/>
							</button>
						</div>
						<div className="grid min-h-0 flex-1 place-items-center bg-slate-100 p-2 sm:p-4">
							<img
								className="block h-full max-h-full w-full max-w-full rounded-lg bg-white object-contain shadow-sm"
								src={kosen.image}
								alt={`${kosen.name}のRP資料`}
								referrerPolicy="no-referrer"
							/>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}
