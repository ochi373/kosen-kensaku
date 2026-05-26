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
        <section>
            <ResultTitle />
            {matchedKosenList.map(k => (
                <Kosen key={k.name} {...k} />
            ))}
        </section>
    )
}

function getSelections(params: URLSearchParams, paramKey: string) {
    const v = params.get(paramKey)
    return v ? v.split(',') : []
}