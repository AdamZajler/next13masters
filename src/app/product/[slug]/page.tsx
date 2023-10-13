import { type Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { revalidateTag } from "next/cache";
import { parsePrice } from "@/utils/parsePrice";
import { executeGraphQl } from "@/lib/executeGraphQl";
import { ProductGetBySlugDocument } from "@/gql/graphql";
import { RelatedProducts } from "@/components/RelatedProducts";
import { AddToCartButton } from "@/components/Button/AddToCartButton";
import { addToCart, getOrCreateCart } from "@/services/cart";
import { Reviews } from "@/components/Reviews";
export const generateMetadata = async ({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> => {
	const products = await executeGraphQl({
		query: ProductGetBySlugDocument,
		variables: {
			slug: params.slug,
		},
	});

	if (!products.products?.data || !products.products.data[0]?.attributes) {
		notFound();
	}

	const product = products.products.data[0].attributes;

	return {
		title: product.title,
		description: `${product.description}`,
		openGraph: {
			title: product.title,
			description: product.description,
			images: product.images.data[0]?.attributes?.url,
		},
	} as Metadata;
};

export default async function ProductPage({
	params,
}: {
	params: { slug: string };
}) {
	const products = await executeGraphQl({
		query: ProductGetBySlugDocument,
		variables: {
			slug: params.slug,
		},
	});

	if (
		!products.products?.data ||
		!products.products.data[0]?.attributes ||
		!products.products.data[0].id
	) {
		notFound();
	}

	const product = {
		id: products.products.data[0].id,
		...products.products.data[0].attributes,
	};

	async function addToCartAction() {
		"use server";

		const cart = await getOrCreateCart();

		if (!cart) {
			throw new Error("Failed on addToCartAction");
		}

		await addToCart(cart.id!, product.id);
		revalidateTag("cart");
	}

	return (
		<div className="flex flex-col gap-20">
			<div className="grid max-w-7xl grid-cols-2 gap-8">
				<div>
					<div className="relative h-full min-h-[400px] w-full">
						{product.images.data[0]?.attributes?.url ? (
							<Image
								src={product.images.data[0].attributes.url}
								alt={`Obraz produktu ${product.title}`}
								style={{
									objectFit: "contain",
								}}
								fill
							/>
						) : null}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl">{product?.title}</h1>
					<p>{parsePrice(product.price)}</p>
					{product.colors ? (
						<select>
							{(product.colors as string[]).map((color, index) => (
								<option key={index} value={color}>
									{color}
								</option>
							))}
						</select>
					) : null}
					{product.size ? (
						<select>
							{(product.size as string[]).map((size, index) => (
								<option key={index} value={size}>
									{size}
								</option>
							))}
						</select>
					) : null}
					<div className="mt-4 space-y-6">
						<p>{product.description}</p>
					</div>
					<form action={addToCartAction}>
						<AddToCartButton />
					</form>
				</div>
			</div>
			<Reviews productId={product.id} />
			<RelatedProducts excludedProduct={products.products.data[0].id} />
		</div>
	);
}
