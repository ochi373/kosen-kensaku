import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@workspace/ui/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

import { BrowserRouter, Route, Routes } from "react-router";
import { SelfTestPage } from "./self-test/page";
import { ResultPage } from "./result/page";
import { Layout } from "./layout";

/** ===================================
 * 疑似的なパスワード保護をかけていますが
 * 非常に脆弱なため、機密情報を含めないでください。
 *  =================================== */
let __unsafe__password = prompt("Enter the password:");
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
