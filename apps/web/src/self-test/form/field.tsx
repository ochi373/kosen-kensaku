"use client"

import {
    Field,
    FieldContent,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
} from "@workspace/ui/components/field"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { cn } from "@workspace/ui/lib/utils";
import { Controller } from "react-hook-form";
import type { useSelfTestForm } from "./use-form";

type Option = {
    value: string; // 文字列
    label: string;
}

type Props = {
    form: ReturnType<typeof useSelfTestForm>
    id: "areas" | "subjects" | "others"
    title: string;
    options: Option[]
    cols?: 1 | 2 | 3
    className?: string
}

export function SelfTestFormField({
    form,
    id,
    title,
    options,
    cols = 3,
    className
}: Props) {
    const gridClass = (() => {
        switch (cols) {
            case 1:
                return "grid-cols-1"
            case 2:
                return "grid-cols-2"
            case 3:
            default:
                return "grid-cols-3"
        }
    })()

    return (
        <Controller
            name={id}
            control={form.control}
            render={({ field, fieldState }) => (
                <FieldSet className={className}>
                    <FieldLegend>{title}</FieldLegend>
                    <FieldGroup className={cn(gridClass, "grid gap-2")} data-slot="checkbox-group">
                        {options.map(o =>
                            <Field data-invalid={fieldState.invalid} key={o.value}>
                                <FieldLabel>
                                    <Field orientation="horizontal">
                                        <Checkbox
                                            id={o.value}
                                            aria-invalid={fieldState.invalid}
                                            onCheckedChange={(checked) => {
                                                const newValue = checked
                                                    ? [...field.value, o.value]
                                                    : field.value.filter((v) => v !== o.value)
                                                field.onChange(newValue)
                                            }}
                                        />
                                        <FieldContent>
                                            <FieldTitle>{o.label}</FieldTitle>
                                        </FieldContent>
                                    </Field>
                                </FieldLabel>
                            </Field>
                        )}
                    </FieldGroup>
                </FieldSet>
            )}
        />
    )
}
