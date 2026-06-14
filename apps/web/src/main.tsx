import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@workspace/ui/globals.css";

import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "@/providers/theme-provider";
import { Layout } from "./layout";
import { ResultPage } from "./result/page";
import { SearchPage } from "./search/page";

/** ===================================
 * 疑似的なパスワード保護をかけていますが
 * 非常に脆弱なため、機密情報を含めないでください。
 *  =================================== */
const __unsafe__password = prompt("Enter the password:");
if (__unsafe__password !== "password") {
	alert("Incorrect password. The application will now exit.");
	throw new Error("Incorrect password");
}
/** =================================== */

const root = document.getElementById("root");
if (root == null) throw new Error();
createRoot(root).render(
	<StrictMode>
		<ThemeProvider>
			<BrowserRouter basename="/kosen-kensaku/">
				<Routes>
					<Route element={<Layout />}>
						<Route index element={<SearchPage />} />
						<Route path="result" element={<ResultPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>,
);
