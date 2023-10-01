import { notFound } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { ProductList } from "@/components/ProductList";
import "@/components/main.css";
import { executeGraphql } from "@/lib/executeGraphql";
import { ProductsGetByCategorySlugDocument } from "@/gql/graphql";

export default async function Home({
	params,
}: {
	params: { slug: string; pageNumber: string };
}) {
	const categories = await executeGraphql(ProductsGetByCategorySlugDocument, {
		page: Number(params.pageNumber[0]) || 1,
		slug: params.slug,
	});

	if (!categories.products?.data) {
		return notFound();
	}

	return (
		<main className="container-xl flex min-h-screen w-full flex-col items-center justify-between p-24">
			<ProductList products={categories.products.data} />
			<div className="mt-12">
				<Pagination href="/products/" length={5} />
			</div>
		</main>
	);
}
