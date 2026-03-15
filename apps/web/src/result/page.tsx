import { useMemo } from "react"
import { useSearchParams } from "react-router"
import { KOSEN_LIST } from "./kosen.constants"

const countIntersection = <T extends string | number>(a: readonly T[], b: readonly T[]) => {
  const set = new Set(a);
  return b.filter(x => set.has(x)).length;
};

export function ResultPage() {
    const [searchParams] = useSearchParams()

    const areas = searchParams.get("areas")?.split(',') || []
    const subjects = searchParams.get("subjects")?.split(',') || []
    const others = searchParams.get("others")?.split(',') || []

    const matchedKosenList = useMemo(() => {
        const result = []

        for (const k of KOSEN_LIST) {
            // エリアは選択されているときのみ、必須条件となる
            if (areas.length > 0 && !areas.includes(k.area.value)) continue

            // 分野やこだわりポイントのヒット数
            const s = countIntersection(subjects, k.subjects.map(s => s.value))
            const o = countIntersection(others, k.others.map(o => o.value))
            const counts = s + o
        
            result.push({
                ...k,
                matchedCounts: counts
            })
        }

        return result
    }, [areas, subjects, others])

    return (
        <p>
            適校診断の結果が表示されます。
            <br />
            高専選びのヒントにしてみよう！
            <span>
                {matchedKosenList.map(k => k.name).join(', ')}
            </span>
        </p>
    )
}
