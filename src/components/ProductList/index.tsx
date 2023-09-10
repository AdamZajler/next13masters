import {ProductItem} from "@components/ProductItem";
import {type IProductListItem} from "@/types/IProductListItem";

export const ProductList = ({products}: { products: IProductListItem[] }) => {
    return (
        <div className="grid grid-cols-4 gap-4" data-testid="products-list">
            {products.map((product, index) => (
                <ProductItem key={index} {...product} />
            ))}
        </div>
    );
};
