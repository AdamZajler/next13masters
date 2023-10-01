import { ProductItem } from "@components/ProductItem";
import { type IProduct } from "@/types/IProduct";

export const ProductList = ({ products }: { products: IProduct[] }) => {
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
