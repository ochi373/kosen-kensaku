import { Outlet } from "react-router"

// フィボナッチ数列（1, 1, 2, 3, 5, 8, 13, 21, 34, 55...）で余白を作る
// margin
export function Layout() {
    return (
        <>
            <main>
                <Outlet />
            </main>
            <footer className="py-13 bg-secondary text-center text-xs md:text-sm text-secondary-foreground">
                Copyright © National Institute of Technology. All rights reserved.
            </footer>
        </>
    )
}
