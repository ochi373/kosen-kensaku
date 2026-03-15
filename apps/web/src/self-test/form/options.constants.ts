import type { ComponentProps } from "react";
import type { SelfTestFormField } from "./field";

export const SELF_TEST_FORM = [
    {
        id: "areas",
        title: "エリア",
        options: [
            {
                value: "hokkaido",
                label: "北海道"
            },
            {
                value: "tohoku",
                label: "東北"
            },
            {
                value: "kanto-shinetsu",
                label: "関東信越"
            },
            {
                value: "tokai-hokuriku",
                label: "東海北陸"
            },
            {
                value: "kinki",
                label: "近畿"
            },
            {
                value: "chugoku",
                label: "中国"
            },
            {
                value: "shikoku",
                label: "四国"
            },
            {
                value: "kyusyu-okinawa",
                label: "九州・沖縄"
            }
        ]
    },
    {
        id: "subjects",
        title: "分野",
        cols: 2,
        options: [
            {
                value: "kikai-zairyo",
                label: "機械・材料系"
            },
            {
                value: "denki-denshi",
                label: "電気・電子系"
            },
            {
                value: "joho",
                label: "情報系"
            },
            {
                value: "kagaku-seibutsu",
                label: "化学・生物系"
            },
            {
                value: "kensetsu-kenchiku",
                label: "建設・建築系"
            },
            {
                value: "syosen",
                label: "商船系"
            },
            {
                value: "keizai-business",
                label: "経済・ビジネス系"
            },
            {
                value: "hukugo",
                label: "複合系"
            }
        ]
    },
    {
        id: "others",
        title: "こだわりポイント",
        cols: 2,
        options: [
            {
                value: "seihuku-ari",
                label: "制服あり"
            },
            {
                value: "seihuku-nashi",
                label: "制服なし"
            },
            {
                value: "syokudo-ari",
                label: "食堂あり"
            },
            {
                value: "syokudo-nashi",
                label: "食堂なし"
            }
        ]
    }
] as const satisfies Omit<ComponentProps<typeof SelfTestFormField>, "form">[]

type T = typeof SELF_TEST_FORM

export type FormArea = T[0]["options"][number]
export type FormSubject = T[1]["options"][number]
export type FormOther = T[2]["options"][number]