import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { Pagination } from "@/components/Pagination";
import { ProductList } from "@/components/ProductList";
import "@/components/main.css";
import { executeGraphQl } from "@/lib/executeGraphQl";
import { ProductsGetByCategorySlugDocument } from "@/gql/graphql";

export async function generateStaticParams() {
	return [{ slug: "cap" }, { slug: "t-shirts" }];
}

export const generateMetadata = async ({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> => {
	return {
		title: `${params.slug.charAt(0).toUpperCase() + params.slug.slice(1)}`,
	} as Metadata;
};

export default async function Home({
	params,
}: {
	params: { slug: string; pageNumber: string };
}) {
	const categories = await executeGraphQl({
		query: ProductsGetByCategorySlugDocument,
		variables: {
			page: Number(params.pageNumber ? params.pageNumber[0] : 1),
			slug: params.slug,
		},
	});

	if (!categories.products?.data) {
		return notFound();
	}

	return (
		<>
			<h1 className="text-4xp mb-2">
				{params.slug.charAt(0).toUpperCase() + params.slug.slice(1)}
			</h1>
			<main className="container-xl flex min-h-screen w-full flex-col items-center justify-between p-24">
				<ProductList products={categories.products.data} />
				<div className="mt-12">
					<Pagination href="/collections/" length={1} />
				</div>
			</main>
		</>
	);
}