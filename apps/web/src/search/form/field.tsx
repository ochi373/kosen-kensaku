import { Checkbox } from "@workspace/ui/components/checkbox";
import {
	Field,
	FieldContent,
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
};

type Props = {
	option: Option;
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
	theme: "basic" | "masonry";
};

export function SearchField({ option, field, fieldState, theme }: Props) {
	return (
		<Field data-invalid={fieldState.invalid} key={option.value}>
			<FieldLabel className="shadow-sm shadow-black/20 hover:shadow-lg transition-shadow cursor-pointer has-data-checked:bg-primary has-data-checked:text-primary-foreground">
				<Field orientation="horizontal">
					<Checkbox
						id={option.value}
						aria-invalid={fieldState.invalid}
						onCheckedChange={(checked) => {
							const newValue = checked
								? [...field.value, option.value]
								: field.value.filter((v) => v !== option.value);
							field.onChange(newValue);
						}}
					/>
					<FieldContent>
						<FieldTitle>{option.label}</FieldTitle>
					</FieldContent>
				</Field>
			</FieldLabel>
		</Field>
	);
}
