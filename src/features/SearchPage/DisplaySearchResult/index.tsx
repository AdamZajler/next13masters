import { ProductList } from "@/components/ProductList";
import { SearchGetProductsByQueryDocument } from "@/gql/graphql";
import { executeGraphql } from "@/lib/executeGraphql";

export const DisplaySearchResult = async ({
	query,
}: {
	query: string | null;
}) => {
	if (!query) {
		return null;
	}
	const res = await executeGraphql(SearchGetProductsByQueryDocument, {
		query: query,
	});

	return res.products?.data ? (
		<ProductList products={res.products.data} />
	) : null;
};
