import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@workspace/ui/globals.css";

import { HashRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "@/providers/theme-provider";
import { Layout } from "./layout";
import { ResultPage } from "./result/page";
import { SearchPage } from "./search/page";

const root = document.getElementById("root");
if (root == null) throw new Error();
createRoot(root).render(
	<StrictMode>
		<ThemeProvider>
			<HashRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route index element={<SearchPage />} />
						<Route path="result" element={<ResultPage />} />
					</Route>
				</Routes>
			</HashRouter>
		</ThemeProvider>
	</StrictMode>,
);
