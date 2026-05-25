import type { KOSEN_LIST } from "@/data/kosen"
import { KosenBadges } from "./kosen.badges"

type Props = typeof KOSEN_LIST[number] & {
    matchedList: string[]
}

export function Kosen({ matchedList, ...kosen }: Props) {
    return (
        <section className="mt-5 mx-5">
            <h2 className="text-lg text-bold">{kosen.name}</h2>
            <img
                className="block h-48 w-full object-cover"
                src={kosen.image}
            />
            <KosenBadges className="mt-5" matchedList={matchedList} {...kosen} />
            <a
                href={kosen.href}
                target="_blank"
                className="mt-5 ml-auto w-fit text-right px-3 text-sm border-b border-primary"
            >
                公式ページへ
            </a>
        </section>
    )
}