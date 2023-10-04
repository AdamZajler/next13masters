import { type Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { parsePrice } from "@/utils/parsePrice";
import { executeGraphql } from "@/lib/executeGraphql";
import { ProductGetBySlugDocument } from "@/gql/graphql";
import { generateStrapiUrl } from "@/utils/generateStrapiUrl";
import { RelatedProducts } from "@/components/RelatedProducts";

export const generateMetadata = async ({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> => {
	const products = await executeGraphql(ProductGetBySlugDocument, {
		slug: params.slug,
	});

	if (!products.products?.data || !products.products.data[0]?.attributes) {
		notFound();
	}

	const product = products.products.data[0].attributes;

	return {
		title: `${product.title} - Sklep internetowy`,
		description: product.description,
		openGraph: {
			title: `${product.title} - Sklep internetowy`,
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
	const products = await executeGraphql(ProductGetBySlugDocument, {
		slug: params.slug,
	});

	if (!products.products?.data || !products.products.data[0]?.attributes) {
		notFound();
	}

	const product = products.products.data[0].attributes;

	return (
		<div className="flex flex-col gap-20">
			<div className="grid max-w-7xl grid-cols-2 gap-8">
				<div>
					<div className="relative h-full min-h-[400px] w-full">
						{product.images.data[0]?.attributes?.url ? (
							<Image
								src={generateStrapiUrl(product.images.data[0].attributes.url)}
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
					<p
						dangerouslySetInnerHTML={{
							__html: product.description,
						}}
					/>
				</div>
			</div>
			<RelatedProducts excludedProduct={products.products.data[0].id!} />
		</div>
	);
}