import { SearchForm } from "./form/form";
import { SearchTitle } from "./title";

export function SearchPage() {
	return (
		<section className="bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_32rem),linear-gradient(180deg,#f8fbff_0%,#eef7f7_46%,#ffffff_100%)]">
			<SearchTitle />
			<SearchForm />
		</section>
	);
}
