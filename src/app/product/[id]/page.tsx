import { type Metadata } from "next";
import { ProductItem } from "@/components/ProductItem";
import { type IProduct } from "@/types/IProduct";

export const generateMetadata = async ({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> => {
	const product = (await fetch(
		`https://naszsklep-api.vercel.app/api/products/${params.id}`,
	).then((res) => res.json())) as IProduct;

	return {
		title: `${product.title} - Sklep internetowy`,
		description: product.description,
		openGraph: {
			title: `${product.title} - Sklep internetowy`,
			description: product.description,
			images: product.image,
		},
	} as Metadata;
};

export default async function ProductPage({
	params,
}: {
	params: { id: string };
}) {
	const product = (await fetch(
		`https://naszsklep-api.vercel.app/api/products/${params.id}`,
	).then((res) => res.json())) as IProduct;

	return (
		<div>
			<h1>{product.title}</h1>
			<ProductItem {...product} />
		</div>
	);
}
