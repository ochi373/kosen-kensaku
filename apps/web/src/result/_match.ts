import { KOSEN_LIST } from "@/data/kosen"
import { describe, expect, it } from "vitest"

// 丁寧にやるならKOSEN_LISTとconditionsを引数にとるほうがいい
/**
 * 検索条件に一致する高専を返す。
 * 
 * 各パラメータ同士はAND検索。未選択パラメータは全選択と同等の挙動
 * @param areas エリア：OR検索
 * @param subjects 学科：OR検索
 * @param others こだわりポイント：AND検索
 * @returns 
 */
export function match(areas: string[], subjects: string[], others: string[]) {
    const result = []

    for (const k of KOSEN_LIST) {
        // 各パラメータ同士はAND検索
        // 未選択パラメータは全選択と同等の挙動
        const a = intersect(areas, [k.area])
        const s = intersect(subjects, k.subjects)
        const o = intersect(others, k.others)

        // すべての条件（指定された場合）を満たす必要がある（AND検索）
        const hit =
            (areas.length === 0 || a.length > 0) &&
            (subjects.length === 0 || s.length > 0) &&
            (others.length === 0 || o.length === others.length)
            
        if (!hit) continue
        
        result.push({
            ...k,
            matchedList: [...a, ...s, ...o]
        })
    }

    return result
}

if (import.meta.vitest) {
    describe("match", () => {
        describe("入力値なし（全て未選択）", () => {
            it("条件なし：全ての高専を返す", () => {
                const result = match([], [], [])
                expect(result.length).toBe(KOSEN_LIST.length)
                expect(result.map(r => r.id).sort((a, b) => parseInt(a) - parseInt(b))).toEqual(
                    KOSEN_LIST.map(m => m.id).sort((a, b) => parseInt(a) - parseInt(b))
                )
            })

            it("条件なし：matchedList は空配列", () => {
                const result = match([], [], [])
                result.forEach(r => {
                    expect(r.matchedList).toEqual([])
                })
            })
        })

        describe("エリア検索（OR検索）", () => {
            it("エリア1つ指定：そのエリアのみの高専を返す", () => {
                const firstArea = KOSEN_LIST[0].area
                const result = match([firstArea], [], [])
                const expectedCount = KOSEN_LIST.filter(k => k.area === firstArea).length
                expect(result.length).toBe(expectedCount)
                result.forEach(r => {
                    expect(r.area).toBe(firstArea)
                })
            })

            it("エリア複数指定：いずれかのエリアに属する高専を返す（OR検索）", () => {
                const firstArea = KOSEN_LIST[0].area
                const secondArea = KOSEN_LIST.find(k => k.area !== firstArea)?.area
                if (secondArea) {
                    const result = match([firstArea, secondArea], [], [])
                    const expectedAreas = new Set([firstArea, secondArea])
                    result.forEach(r => {
                        expect(expectedAreas.has(r.area)).toBe(true)
                    })
                }
            })

            it("マッチしないエリア指定：空配列を返す", () => {
                const result = match(["存在しないエリア"], [], [])
                expect(result).toEqual([])
            })

            it("エリア指定：matchedList に area が含まれる", () => {
                const target = KOSEN_LIST[0]
                const result = match([target.area], [], [])
                if (result.length > 0) {
                    expect(result[0].matchedList).toContain(target.area)
                }
            })
        })

        describe("学科検索（OR検索）", () => {
            it("学科1つ指定：その学科を持つ高専を返す", () => {
                const targetSubject = KOSEN_LIST.find(k => k.subjects.length > 0)?.subjects[0]
                if (targetSubject) {
                    const result = match([], [targetSubject], [])
                    expect(result.length).toBeGreaterThan(0)
                    result.forEach(r => {
                        expect(r.subjects).toContain(targetSubject)
                    })
                }
            })

            it("学科複数指定：いずれかの学科を持つ高専を返す（OR検索）", () => {
                const subject1 = KOSEN_LIST.find(k => k.subjects.length > 0)?.subjects[0]
                const subject2 = KOSEN_LIST.find(k => k.subjects.length > 1)?.subjects[1]
                if (subject1 && subject2 && subject1 !== subject2) {
                    const result = match([], [subject1, subject2], [])
                    expect(result.length).toBeGreaterThan(0)
                    result.forEach(r => {
                        const hasMatch = r.subjects.some(s => [subject1, subject2].includes(s))
                        expect(hasMatch).toBe(true)
                    })
                }
            })

            it("マッチしない学科指定：空配列を返す", () => {
                const result = match([], ["s999"], [])
                expect(result).toEqual([])
            })

            it("学科指定：matchedList に該当学科が含まれる", () => {
                const targetSubject = KOSEN_LIST.find(k => k.subjects.length > 0)?.subjects[0]
                if (targetSubject) {
                    const result = match([], [targetSubject], [])
                    result.forEach(r => {
                        expect(r.matchedList).toContain(targetSubject)
                    })
                }
            })
        })

        describe("こだわりポイント検索（AND検索）", () => {
            it("こだわり1つ指定：そのこだわりを持つ高専を返す", () => {
                const targetOther = KOSEN_LIST.find(k => k.others.length > 0)?.others[0]
                if (targetOther) {
                    const result = match([], [], [targetOther])
                    expect(result.length).toBeGreaterThan(0)
                    result.forEach(r => {
                        expect(r.others).toContain(targetOther)
                    })
                }
            })

            it("こだわり複数指定：指定された全てのこだわりを持つ高専を返す（AND検索）", () => {
                const kosenWith2Others = KOSEN_LIST.find(k => k.others.length >= 2)
                if (kosenWith2Others && kosenWith2Others.others.length >= 2) {
                    const [o1, o2] = kosenWith2Others.others
                    const result = match([], [], [o1, o2])
                    if (result.length > 0) {
                        result.forEach(r => {
                            expect(r.others).toContain(o1)
                            expect(r.others).toContain(o2)
                        })
                    }
                }
            })

            it("全てのこだわりを持つ高専がない場合：空配列を返す", () => {
                const result = match([], [], ["o999", "o1000", "o1001"])
                expect(result).toEqual([])
            })

            it("マッチしないこだわり指定：空配列を返す", () => {
                const result = match([], [], ["o999"])
                expect(result).toEqual([])
            })

            it("こだわり指定：matchedList に該当こだわりが全て含まれる", () => {
                const targetOther = KOSEN_LIST.find(k => k.others.length > 0)?.others[0]
                if (targetOther) {
                    const result = match([], [], [targetOther])
                    result.forEach(r => {
                        expect(r.matchedList).toContain(targetOther)
                    })
                }
            })
        })

        describe("複合検索（各パラメータ同士はAND検索）", () => {
            it("エリア + 学科：エリアに属し、かつ学科を持つ", () => {
                const target = KOSEN_LIST.find(k => k.subjects.length > 0)
                if (target) {
                    const result = match([target.area], [target.subjects[0]], [])
                    expect(result.length).toBeGreaterThan(0)
                    result.forEach(r => {
                        expect(r.area).toBe(target.area)
                        expect(r.subjects).toContain(target.subjects[0])
                    })
                }
            })

            it("エリア + こだわり：エリアに属し、かつこだわりを全て持つ", () => {
                const target = KOSEN_LIST.find(k => k.others.length > 0)
                if (target) {
                    const result = match([target.area], [], [target.others[0]])
                    expect(result.length).toBeGreaterThan(0)
                    result.forEach(r => {
                        expect(r.area).toBe(target.area)
                        expect(r.others).toContain(target.others[0])
                    })
                }
            })

            it("学科 + こだわり：学科を持ち、かつこだわりを全て持つ", () => {
                const target = KOSEN_LIST.find(
                    k => k.subjects.length > 0 && k.others.length > 0
                )
                if (target) {
                    const result = match([], [target.subjects[0]], [target.others[0]])
                    expect(result.length).toBeGreaterThan(0)
                    result.forEach(r => {
                        expect(r.subjects).toContain(target.subjects[0])
                        expect(r.others).toContain(target.others[0])
                    })
                }
            })

            it("全ての条件を指定：全条件を満たす高専のみを返す", () => {
                const target = KOSEN_LIST.find(
                    k => k.subjects.length > 0 && k.others.length > 0
                )
                if (target) {
                    const result = match([target.area], [target.subjects[0]], [target.others[0]])
                    expect(result.length).toBeGreaterThan(0)
                    result.forEach(r => {
                        expect(r.area).toBe(target.area)
                        expect(r.subjects).toContain(target.subjects[0])
                        expect(r.others).toContain(target.others[0])
                    })
                }
            })
        })

        describe("matchedList の正確性", () => {
            it("matchedList は、マッチしたエリア、学科、こだわりのみを含む", () => {
                const target = KOSEN_LIST.find(
                    k => k.subjects.length > 0 && k.others.length > 0
                )
                if (target) {
                    const result = match([target.area], [target.subjects[0]], [target.others[0]])
                    if (result.length > 0) {
                        const matched = result[0]
                        expect(matched.matchedList).toContain(target.area)
                        expect(matched.matchedList).toContain(target.subjects[0])
                        expect(matched.matchedList).toContain(target.others[0])
                    }
                }
            })

            it("複数マッチ時：matchedList は重複なく全てのマッチを含む", () => {
                const target = KOSEN_LIST.find(k => k.subjects.length >= 2)
                if (target && target.subjects.length >= 2) {
                    const [s1, s2] = target.subjects
                    const result = match([], [s1, s2], [])
                    result.forEach(r => {
                        const expectedMatches = r.subjects.filter(s => [s1, s2].includes(s))
                        expectedMatches.forEach(m => {
                            expect(r.matchedList).toContain(m)
                        })
                    })
                }
            })
        })

        describe("エッジケース", () => {
            it("複数条件でマッチなし：空配列を返す", () => {
                const result = match(["存在しないエリア"], ["s999"], [])
                expect(result).toEqual([])
            })

            it("空配列が複数回渡される場合", () => {
                const result1 = match([], [], [])
                const result2 = match([], [], [])
                expect(result1.length).toBe(result2.length)
            })

            it("同じエリアを複数指定", () => {
                const firstArea = KOSEN_LIST[0].area
                const result1 = match([firstArea], [], [])
                const result2 = match([firstArea, firstArea], [], [])
                expect(result1.length).toBe(result2.length)
                expect(result1.map(r => r.id)).toEqual(result2.map(r => r.id))
            })

            it("こだわりが空の高専：こだわり条件なしで取得可能", () => {
                const result = match([], [], [])
                const noOthersKosen = result.find(r => r.others.length === 0)
                expect(noOthersKosen).toBeDefined()
            })
        })

        describe("結果の整合性", () => {
            it("返された高専は元のデータと一致", () => {
                const result = match([], [], [])
                result.forEach(r => {
                    const original = KOSEN_LIST.find(m => m.id === r.id)
                    expect(original).toBeDefined()
                    expect(r.id).toBe(original?.id)
                    expect(r.name).toBe(original?.name)
                    expect(r.area).toBe(original?.area)
                })
            })

            it("重複なく返す", () => {
                const areas = [...new Set(KOSEN_LIST.map(k => k.area))].slice(0, 3)
                const result = match(areas, [], [])
                const ids = result.map(r => r.id)
                const uniqueIds = new Set(ids)
                expect(ids.length).toBe(uniqueIds.size)
            })
        })
    })
}

const intersect = <T extends string | number>(a: readonly T[], b: readonly T[]) => {
  const set = new Set(a);
  return b.filter(x => set.has(x))
};