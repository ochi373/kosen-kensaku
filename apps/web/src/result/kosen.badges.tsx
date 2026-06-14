import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import { CONDITIONS } from "@/data/conditions";
import type { KOSEN_LIST } from "@/data/kosen";
import { SUBJECTS } from "@/data/subjects";

type Props = (typeof KOSEN_LIST)[number] & {
	className?: string;
	matchedList: string[];
};

// 本当はmatchedListを各カテゴリごとに分けたほうがパフォーマンスがよさそう？
export function KosenBadges({ className, matchedList, ...kosen }: Props) {
	return (
		// ulのほうがいいけどいったんdivで
		<div className={cn("flex gap-2 flex-wrap", className)}>
			{kosen.subjects.map((s) => {
				const matched = matchedList.includes(s);

				return (
					<Badge
						key={s}
						variant={matched ? "default" : "outline"}
						className={getBadgeClass(matched)}
					>
						{SUBJECTS.find((subject) => subject.value === s)?.label.slice(
							1,
							-1,
						)}
					</Badge>
				);
			})}
			{kosen.others.map((o) => {
				const matched = matchedList.includes(o);

				return (
					<Badge
						key={o}
						variant={matched ? "default" : "outline"}
						className={getBadgeClass(matched)}
					>
						{
							CONDITIONS.find((condition) => condition.value === o)?.[
								"short-label"
							]
						}
					</Badge>
				);
			})}
		</div>
	);
}

function getBadgeClass(matched: boolean) {
	return cn(
		"h-7 px-3 text-xs",
		matched
			? "bg-slate-950 text-white dark:bg-sky-400 dark:text-slate-950"
			: "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
	);
}
