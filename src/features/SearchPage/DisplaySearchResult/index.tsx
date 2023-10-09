import { ProductList } from "@/components/ProductList";
import { SearchGetProductsByQueryDocument } from "@/gql/graphql";
import { executeGraphQl } from "@/lib/executeGraphQl";

export const DisplaySearchResult = async ({
	query,
}: {
	query: string | null;
}) => {
	if (!query) {
		return null;
	}
	const res = await executeGraphQl({
		query: SearchGetProductsByQueryDocument,
		variables: {
			query: query,
		},
	});

	return res.products?.data ? (
		<ProductList products={res.products.data} />
	) : null;
};
