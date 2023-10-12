import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { Pagination } from "@/components/Pagination";
import { ProductList } from "@/components/ProductList";
import "@/components/main.css";
import { executeGraphQl } from "@/lib/executeGraphQl";
import { ProductsGetCollectionsBySlugDocument } from "@/gql/graphql";

export async function generateStaticParams() {
	return [{ slug: "cap" }, { slug: "t-shirts" }];
}

export const generateMetadata = async ({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> => {
	const collections = await executeGraphQl({
		query: ProductsGetCollectionsBySlugDocument,
		variables: { slug: params.slug },
	});

	if (!collections.collections?.data || !collections.collections.data[0]?.id) {
		return notFound();
	}

	const collection = collections.collections.data[0];

	if (!collection.attributes?.products?.data) {
		return notFound();
	}

	return {
		title: collection.attributes.title,
	} as Metadata;
};

export default async function Home({
	params,
}: {
	params: { slug: string; pageNumber: string };
}) {
	const collections = await executeGraphQl({
		query: ProductsGetCollectionsBySlugDocument,
		variables: { slug: params.slug },
	});

	if (!collections.collections?.data || !collections.collections.data[0]?.id) {
		return notFound();
	}

	const collection = collections.collections.data[0];

	if (!collection.attributes?.products?.data) {
		return notFound();
	}

	return (
		<>
			<h1 className="text-4xp mb-2">{collection.attributes.title}</h1>
			<section
				data-testid="collections"
				className="container-xl flex min-h-screen w-full flex-col items-center justify-between p-24"
			>
				<ProductList products={collection.attributes.products.data} />
				<div className="mt-12">
					<Pagination href="/collections/" length={1} />
				</div>
			</section>
		</>
	);
}
