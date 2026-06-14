import {
	AiBrain03Icon,
	AiChemistry03Icon,
	AiComputerIcon,
	Atom01Icon,
	BadgeInfoIcon,
	BridgeIcon,
	Building05Icon,
	CargoShipIcon,
	ChartUpIcon,
	CubeIcon,
	ElectricTower02Icon,
	Factory02Icon,
	GoogleMapsIcon,
	SchoolIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle,
} from "@workspace/ui/components/field";
import type {
	ControllerFieldState,
	ControllerRenderProps,
} from "react-hook-form";

type Option = {
	value: string; // 文字列
	label: string;
	decription?: string;
	"short-label"?: string;
};

type Props = {
	option: Option;
	groupId: "areas" | "subjects" | "qualifications" | "others";
	field: ControllerRenderProps<
		{
			areas: string[];
			subjects: string[];
			qualifications: string[];
			others: string[];
		},
		"areas" | "subjects" | "qualifications" | "others"
	>;
	fieldState: ControllerFieldState; // Controller前提なのは汚いが突貫なので許してほしい
};

export function SearchField({ option, groupId, field, fieldState }: Props) {
	const selected = field.value.includes(option.value);
	const title = getTitle(option, groupId);
	const caption = getCaption(option, groupId);
	const Icon = getIcon(option.value, groupId);
	const isCompact = groupId !== "subjects";

	return (
		<Field data-invalid={fieldState.invalid} key={option.value}>
			<FieldLabel
				className="group relative h-full cursor-pointer overflow-visible rounded-2xl border border-slate-200/80 bg-white/85 shadow-[0_14px_40px_rgba(31,52,77,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_24px_60px_rgba(14,116,144,0.14)] has-data-checked:border-sky-500 has-data-checked:bg-sky-50 has-data-checked:text-slate-950"
				title={caption}
			>
				<Field
					orientation="horizontal"
					className={isCompact ? "items-center p-3" : "items-start p-4"}
				>
					<Checkbox
						id={option.value}
						checked={selected}
						aria-invalid={fieldState.invalid}
						onCheckedChange={(checked) => {
							const newValue = checked
								? [...field.value, option.value]
								: field.value.filter((v) => v !== option.value);
							field.onChange(newValue);
						}}
					/>
					<div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white shadow-inner shadow-white/10 transition-colors group-has-data-checked:bg-sky-600">
						<HugeiconsIcon icon={Icon} strokeWidth={1.8} className="size-5" />
					</div>
					<FieldContent>
						<div className="flex items-start justify-between gap-2">
							<FieldTitle className="text-sm font-semibold text-slate-950">
								{title}
							</FieldTitle>
							{caption ? <InfoTip text={caption} /> : null}
						</div>
						{caption ? (
							<FieldDescription
								className={
									isCompact
										? "line-clamp-1 text-xs leading-relaxed text-slate-500"
										: "line-clamp-2 text-xs leading-relaxed text-slate-600"
								}
							>
								{caption}
							</FieldDescription>
						) : null}
					</FieldContent>
				</Field>
			</FieldLabel>
		</Field>
	);
}

function InfoTip({ text }: { text: string }) {
	return (
		<span className="group/tip relative mt-0.5 inline-flex shrink-0">
			<span className="grid size-6 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm">
				<HugeiconsIcon
					icon={BadgeInfoIcon}
					strokeWidth={1.8}
					className="size-3.5"
				/>
			</span>
			<span className="pointer-events-none absolute right-0 top-8 z-20 w-64 rounded-2xl bg-slate-950 px-3 py-2 text-left text-xs font-medium leading-relaxed text-white opacity-0 shadow-2xl shadow-slate-950/20 transition group-hover/tip:opacity-100 group-focus-within/tip:opacity-100">
				{text}
			</span>
		</span>
	);
}

function getTitle(option: Option, groupId: Props["groupId"]) {
	if (groupId === "subjects") return option.label.replace(/[【】]/g, "");
	if (groupId === "others") return option["short-label"] ?? option.label;
	return option.label;
}

function getCaption(option: Option, groupId: Props["groupId"]) {
	if (groupId === "subjects") return option.decription;
	if (groupId === "others") return option.label;
	if (groupId === "areas") return `${option.label}エリアの国立高専を探す`;
	return undefined;
}

function getIcon(value: string, groupId: Props["groupId"]) {
	if (groupId === "areas") return GoogleMapsIcon;
	if (groupId === "others") return SchoolIcon;

	const subjectIcons = {
		s1: Factory02Icon,
		s2: CubeIcon,
		s3: ElectricTower02Icon,
		s4: Atom01Icon,
		s5: AiComputerIcon,
		s6: AiChemistry03Icon,
		s7: Building05Icon,
		s8: BridgeIcon,
		s9: CargoShipIcon,
		s10: ChartUpIcon,
	} as const;

	return subjectIcons[value as keyof typeof subjectIcons] ?? AiBrain03Icon;
}
