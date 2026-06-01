import { useMemo } from "react"
import { useSearchParams } from "react-router"
import { ResultTitle } from "./title";
import { Kosen } from "./kosen";
import { match } from "./_match";

// 本当は診断ページから取得するべき
const PARAM_KEYS = ["areas", "subjects", "others"]

export function ResultPage() {
    const [searchParams] = useSearchParams()

    const [areas, subjects, others] = PARAM_KEYS.map(p => {
        return getSelections(searchParams, p)
    })

    const matchedKosenList = useMemo(() => {
        return match(areas, subjects, others)
    }, [areas, subjects, others])

    return (
        <section className="space-y-6">
            <ResultTitle />
            <div className="p-4 flex flex-wrap gap-4 justify-start">
                {matchedKosenList.map(k => (
                    <Kosen key={k.name} className="w-full sm:flex-1 sm:min-w-76 sm:max-w-sm" {...k} />
                ))}
            </div>
        </section>
    )
}

function getSelections(params: URLSearchParams, paramKey: string) {
    const v = params.get(paramKey)
    return v ? v.split(',') : []
}