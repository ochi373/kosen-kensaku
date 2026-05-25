export function ResultTitle() {
    return (
        <div className="h-60 bg-linear-to-b from-cyan-500 to-blue-500 flex items-center justify-center">
            <h1 className="text-center block h-fit text-[32px] font-bold text-primary-foreground">
                <span className="pr-2">検索結果</span>
                <br />
                <span className="block mt-[6px] text-sm text-primary-foreground/98">
                    あなたの希望に合う高専はこちら！
                    <br />高専選びのヒントにしてみよう。
                </span>
            </h1>
        </div>
    )
}