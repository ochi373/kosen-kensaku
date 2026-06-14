type Props = {
	count: number;
};

export function ResultTitle({ count }: Props) {
	return (
		<div className="relative overflow-hidden bg-slate-950 text-white">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(20,184,166,0.28),transparent_24rem),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.32),transparent_22rem)]" />
			<div className="relative mx-auto flex min-h-64 max-w-6xl flex-col justify-center px-4 py-14 sm:px-6">
				<p className="mb-3 w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-sky-100 backdrop-blur">
					{count} schools matched
				</p>
				<h1 className="text-4xl font-black tracking-normal sm:text-5xl">
					検索結果
				</h1>
				<p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-200">
					条件に合う国立高専を表示しています。気になる学校は公式ページで最新情報を確認してみましょう。
				</p>
			</div>
		</div>
	);
}
