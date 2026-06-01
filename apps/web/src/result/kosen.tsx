import type { KOSEN_LIST } from "@/data/kosen"
import { KosenBadges } from "./kosen.badges"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"

type Props = typeof KOSEN_LIST[number] & {
    matchedList: string[],
    className?: string,
}

export function Kosen({ matchedList, className, ...kosen }: Props) {
    return (
        <Card className={className}>
            <CardHeader>
            <CardTitle className="text-lg text-bold">{kosen.name}</CardTitle>
            <img
                className="block h-48 w-full object-cover"
                src={kosen.image}
            />
            </CardHeader>
            <CardContent>
            <KosenBadges matchedList={matchedList} {...kosen} />
            </CardContent>
            <CardFooter>
            <a
                href={kosen.href}
                target="_blank"
                className="ml-auto w-fit text-right px-3 text-sm border-b border-primary"
            >
                公式ページへ
            </a>
            </CardFooter>
        </Card>
    )
}