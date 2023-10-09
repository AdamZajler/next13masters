import { DisplaySearchResult } from "@/features/SearchPage/DisplaySearchResult";
import { SearchPageContainer } from "@/features/SearchPage/SearchPageContainer";

export default async function Search({
	searchParams,
}: {
	searchParams: { query: string };
}) {
	const searchParamsParsed =
		Object.keys(searchParams).length > 0 ? searchParams.query : null;

	return (
		<main className="container-xl flex min-h-screen w-full flex-col items-center justify-between p-24">
			<SearchPageContainer>
				<DisplaySearchResult query={searchParamsParsed} />
			</SearchPageContainer>
		</main>
	);
}
