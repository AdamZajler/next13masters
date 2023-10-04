import { ProductItem } from "../ProductItem";
import { GetRelatedProductsDocument } from "@/gql/graphql";
import { executeGraphql } from "@/lib/executeGraphql";

export const RelatedProducts = async ({
	excludedProduct,
}: {
	excludedProduct: string;
}) => {
	const products = await executeGraphql(GetRelatedProductsDocument, {
		slug: excludedProduct,
	});

	if (!products.products) {
		return null;
	}

	return (
		<div className="flex flex-col gap-8">
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
