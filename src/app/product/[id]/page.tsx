import { type Metadata } from "next";
import Image from "next/image";
import { type IProduct } from "@/types/IProduct";
import { parsePrice } from "@/utils/parsePrice";

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
	const { image, title, price, longDescription } = (await fetch(
		`https://naszsklep-api.vercel.app/api/products/${params.id}`,
	).then((res) => res.json())) as IProduct;

	return (
		<div className="grid max-w-7xl grid-cols-2 gap-8">
			<div>
				<div className="relative h-full min-h-[400px] w-full">
					<Image
						src={image}
						alt={`Obraz produktu ${title}`}
						style={{
							objectFit: "contain",
						}}
						fill
					/>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl">{title}</h1>
				<p>{parsePrice(price)}</p>
				<p dangerouslySetInnerHTML={{ __html: longDescription }} />
			</div>
		</div>
	);
}
