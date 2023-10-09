import { ProductItem } from "../ProductItem";
import { GetRelatedProductsDocument } from "@/gql/graphql";
import { executeGraphQl } from "@/lib/executeGraphQl";

export const RelatedProducts = async ({
	excludedProduct,
}: {
	excludedProduct: string;
}) => {
	const products = await executeGraphQl({
		query: GetRelatedProductsDocument,
		variables: {
			slug: excludedProduct,
		},
	});

	if (!products.products) {
		return null;
	}

	return (
		<div className="flex flex-col gap-8" data-testid="related-products">
			<h3>Powiązane produkty</h3>
			<ul className="flex">
				{products.products.data.map((product, index) => (
					<li key={index}>
						<ProductItem {...product} />
					</li>
				))}
			</ul>
		</div>
	);
};
