import { CONDITIONS } from "@/data/conditions"
import type { KOSEN_LIST } from "@/data/kosen"
import { SUBJECTS } from "@/data/subjects"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"

type Props = typeof KOSEN_LIST[number] & {
    className?: string
    matchedList: string[]
}

// 本当はmatchedListを各カテゴリごとに分けたほうがパフォーマンスがよさそう？
export function KosenBadges({ className, matchedList, ...kosen }: Props) {
    return (
        // ulのほうがいいけどいったんdivで
        <div className={cn("flex gap-2 flex-wrap", className)}>
            <Badge
                variant={matchedList.includes(kosen.area) ? "default" : "outline"}
            >
                {kosen.area}
            </Badge>
            {kosen.subjects.map(s => 
                <Badge
                    key={s}
                    variant={matchedList.includes(s) ? "default" : "outline"}
                >
                    {SUBJECTS.find(subject => subject.value === s)?.label.slice(1, -1)}
                </Badge>
            )}
            {kosen.others.map(o =>
                <Badge
                    key={o}
                    variant={matchedList.includes(o) ? "default" : "outline"}
                >
                    {CONDITIONS.find(condition => condition.value === o)?.["short-label"]}
                </Badge>
            )}
        </div>
    )
}