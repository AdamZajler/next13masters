import { type ProductListItemFragment } from "@/gql/graphql";
import { ProductItem } from "@components/ProductItem";

export const ProductList = ({
	products,
}: {
	products: ProductListItemFragment[];
}) => {
	return (
		<ul
			className="products-grid grid w-full justify-center gap-2"
			data-testid="products-list"
		>
			{products.map((product, index) => (
				<li key={index}>
					<ProductItem {...product} />
				</li>
			))}
		</ul>
	);
};
