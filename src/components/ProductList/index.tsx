import { ProductItem } from "@components/ProductItem";
import { type IProduct } from "@/types/IProduct";

export const ProductList = ({ products }: { products: IProduct[] }) => {
	return (
		<ul className="grid grid-cols-4 gap-4" data-testid="products-list">
			{products.map((product, index) => (
				<li key={index}>
					<a href={`/product/${product.id}`}>
						<ProductItem {...product} />
					</a>
				</li>
			))}
		</ul>
	);
};
