import { useMemo } from "react"
import { useSearchParams } from "react-router"
import { ResultTitle } from "./title";
import { Kosen } from "./kosen";
import { KOSEN_LIST } from "@/data/kosen";

const intersect = <T extends string | number>(a: readonly T[], b: readonly T[]) => {
  const set = new Set(a);
  return b.filter(x => set.has(x))
};

// 本当は診断ページから取得するべき
const PARAM_KEYS = ["areas", "subjects", "others"]

export function ResultPage() {
    const [searchParams] = useSearchParams()

    const [areas, subjects, others] = PARAM_KEYS.map(p => {
        return getSelections(searchParams, p)
    })

    const matchedKosenList = useMemo(() => {
        const result = []

        for (const k of KOSEN_LIST) {
            // エリアは選択されているときのみ、必須条件となる
            if (areas.length > 0 && !areas.includes(k.area)) continue

            // 分野やこだわりポイントのヒット
            const a = intersect(areas, [k.area])
            const s = intersect(subjects, k.subjects)
            const o = intersect(others, k.others)

            const hit =
                a.length > 0 ||
                s.length > 0 ||
                (others.length > 0 && o.length === others.length)
                
            if (!hit) continue
        
            result.push({
                ...k,
                matchedList: [...a, ...s, ...o]
            })
        }

        return result
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