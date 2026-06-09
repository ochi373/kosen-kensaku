"use client"

import { Button } from "@workspace/ui/components/button"
import { SearchFormFieldset } from "./fieldset"
import { SELF_TEST_FORM } from "./options.constants"
import { useSearchForm } from "./use-form"
import type { ConditionsSchema } from "./schema"
import { createSearchParams, useNavigate } from "react-router"

export function SearchForm() {
    const form = useSearchForm()
    const navigate = useNavigate()

    const onSubmit = (d: ConditionsSchema) => {
        const search = createSearchParams({
            areas: d.areas.join(","),
            subjects: d.subjects.join(","),
            qualifications: d.qualifications.join(","),
            others: d.others.join(","),
        }).toString();

        navigate({
            pathname: "/result",
            search
        })
    }

    return (
        <form className="px-8" onSubmit={form.handleSubmit(onSubmit)}>
            {SELF_TEST_FORM.map((f) => <SearchFormFieldset form={form} className="mt-8" {...f} />)}
            <div className="my-8 flex justify-center">
                <Button type="submit" size="lg">条件に合う高専を見る</Button>
            </div>
        </form>
    )
}
