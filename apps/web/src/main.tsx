import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@workspace/ui/globals.css";
import { ThemeProvider } from "@/components/theme-provider.tsx";

import { BrowserRouter, Route, Routes } from "react-router";
import { SelfTestPage } from "./self-test/page";
import { ResultPage } from "./result/page";
import { Layout } from "./layout";

const root = document.getElementById("root");
if (root == null) throw new Error();
createRoot(root).render(
	<StrictMode>
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route index element={<SelfTestPage />} />
						<Route path="result" element={<ResultPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>,
);
