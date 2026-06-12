import type { ComponentProps } from "react";
import type { SearchFormFieldset } from "./fieldset";
import { SUBJECTS } from "@/data/subjects"
import { CONDITIONS } from "@/data/conditions";
import { AREAS } from "@/data/areas";

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
        options: AREAS
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
] as const satisfies Omit<ComponentProps<typeof SearchFormFieldset>, "form">[]

type T = typeof SELF_TEST_FORM

export type FormSubject = T[0]["options"][number]
export type FormArea = T[1]["options"][number]
export type FormConditions = T[2]["options"][number]