import { ArrowLeft02Icon, SchoolIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, Outlet, useLocation } from "react-router";

// フィボナッチ数列（1, 1, 2, 3, 5, 8, 13, 21, 34, 55...）で余白を作る
// margin
export function Layout() {
	const location = useLocation();
	const isResult = location.pathname.includes("/result");

	return (
		<>
			<header className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur-xl">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
					<Link
						to="/"
						className="flex items-center gap-2 text-sm font-bold text-slate-950"
					>
						<span className="grid size-9 place-items-center rounded-2xl bg-slate-950 text-white">
							<HugeiconsIcon
								icon={SchoolIcon}
								strokeWidth={1.8}
								className="size-5"
							/>
						</span>
						国立高専検索
					</Link>
					{isResult ? (
						<Link
							to="/"
							className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-sky-300 hover:text-sky-700"
						>
							<HugeiconsIcon
								icon={ArrowLeft02Icon}
								strokeWidth={1.8}
								className="size-4"
							/>
							検索に戻る
						</Link>
					) : null}
				</div>
			</header>
			<main className="min-h-screen">
				<Outlet />
			</main>
			<footer className="bg-slate-950 py-13 text-center text-xs text-slate-300 md:text-sm">
				Copyright © National Institute of Technology. All rights reserved.
			</footer>
		</>
	);
}
