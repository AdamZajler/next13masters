import { notFound } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { ProductList } from "@/components/ProductList";
import "@/components/main.css";
import { executeGraphQl } from "@/lib/executeGraphQl";
import { ProductsGetListDocument } from "@/gql/graphql";

export async function generateStaticParams() {
	return [{ pageNumber: "1" }, { pageNumber: "2" }];
}

export default async function Home({
	params,
}: {
	params: { pageNumber: string };
}) {
	if (Object.keys(params).length > 0) {
		if (!Number(params.pageNumber[0])) {
			return notFound();
		}
	}

	const products = await executeGraphQl({
		query: ProductsGetListDocument,
		variables: {
			page: Number(params.pageNumber) || 1,
		},
	});

	if (!products.products) {
		return notFound();
	}

	return (
		<>
			<h1 className="text-4xp mb-2">Products</h1>
			<main className="container-xl flex min-h-screen w-full flex-col items-center justify-between p-24">
				<ProductList products={products.products.data} />
				<div className="mt-12">
					<Pagination
						href="/products/"
						length={products.products.meta.pagination.pageCount}
					/>
				</div>
			</main>
		</>
	);
}
