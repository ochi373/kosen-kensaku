import type { ComponentProps } from "react";
import type { SelfTestFormField } from "./field";
import { SUBJECTS } from "@/data/subjects"
import { CONDITIONS } from "@/data/conditions";

export const SELF_TEST_FORM = [
    {
        id: "subjects",
        title: "学科・コース",
        cols: {
            sm: 2,
            md: 2,
            lg: 3,
        },
        options: SUBJECTS
    },
    {
       id: "areas",
        title: "エリア",
        cols: {
            sm: 2,
            md: 2,
            lg: 3,
        },
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
        id: "others",
        title: "こだわり条件",
        cols: {
            sm: 1,
            md: 1,
            lg: 2,
        },
        options: CONDITIONS
    }
] as const satisfies Omit<ComponentProps<typeof SelfTestFormField>, "form">[]

type T = typeof SELF_TEST_FORM

export type FormSubject = T[0]["options"][number]
export type FormArea = T[1]["options"][number]
export type FormConditions = T[2]["options"][number]