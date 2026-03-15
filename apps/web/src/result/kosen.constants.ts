import type { FormArea, FormOther, FormSubject } from "@/self-test/form/options.constants"

type Kosen = {
    name: string;
    description: string;
    image: {
        src: string;
        alt: string;
    }
    href: string;
    area: FormArea
    subjects?: FormSubject[]
    others?: FormOther[]
}

export const KOSEN_LIST = [
    {
        name: "○○高専",
        description: "",
        image: {
            src: "https://picsum.photos/200",
            alt: ""
        },
        href: "",
        area: {
            "label": "四国",
            "value": "shikoku"
        },
        subjects: [
            {
                "label": "化学・生物系",
                "value": "kagaku-seibutsu",
            },
            {
                "label": "建設・建築系",
                "value": "kensetsu-kenchiku",
            }
        ],
        others: [
            {
                "label": "食堂あり",
                "value": "syokudo-ari",
            }
        ]
    }
] as const satisfies Kosen[]