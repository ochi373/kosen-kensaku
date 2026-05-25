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

type Cols = 1 | 2 | 3

type Props = {
    form: ReturnType<typeof useSelfTestForm>
    id: "areas" | "subjects" | "qualifications" | "others"
    title: string;
    options: Option[]
    cols?: {
        sm: Cols,
        md: Cols,
        lg: Cols,
    }
    className?: string
}

export function SelfTestFormField({
    form,
    id,
    title,
    options,
    cols = {
        sm: 1,
        md: 2,
        lg: 3,
    },
    className
}: Props) {
    const gridColsClass = getColsClass(cols)

    return (
        <Controller
            name={id}
            control={form.control}
            render={({ field, fieldState }) => (
                <FieldSet className={className}>
                    <FieldLegend>{title}</FieldLegend>
                    <FieldGroup className={cn(gridColsClass, "grid gap-2")} data-slot="checkbox-group">
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


function getColsClass(p: Props["cols"]) {
    if (!p) return ""

    return cn(
        getColsClassBySize(p.sm, "sm"),
        getColsClassBySize(p.md, "md"),
        getColsClassBySize(p.lg, "lg")
    )
}

function getColsClassBySize(cols: Cols, size: "sm" | "md" | "lg") {
    if (size === "sm") {
        if (cols === 1) return "grid-cols-1"
        if (cols === 2) return "grid-cols-2"
        if (cols === 3) return "grid-cols-3"
    }

    if (size === "md") {
        if (cols === 1) return "md:grid-cols-1"
        if (cols === 2) return "md:grid-cols-2"
        if (cols === 3) return "md:grid-cols-3"
    }

    if (size === "lg") {
        if (cols === 1) return "lg:grid-cols-1"
        if (cols === 2) return "lg:grid-cols-2"
        if (cols === 3) return "lg:grid-cols-3"
    }
}