"use client"

import { Button } from "@workspace/ui/components/button"
import { SelfTestFormField } from "./field"
import { SELF_TEST_FORM } from "./options.constants"
import { useSelfTestForm } from "./use-form"
import type { SelfTestSchema } from "./schema"
import { createSearchParams, useNavigate } from "react-router"

export function SelfTestForm() {
    const form = useSelfTestForm()
    const navigate = useNavigate()

    const onSubmit = (d: SelfTestSchema) => {
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
            {SELF_TEST_FORM.map((f) => <SelfTestFormField form={form} className="mt-8" {...f} />)}
            <div className="my-8 flex justify-center">
                <Button type="submit" size="lg">条件に合う高専を見る</Button>
            </div>
        </form>
    )
}
