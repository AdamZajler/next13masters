import { notFound } from "next/navigation";
import { ProductList } from "@/components/ProductList";
import "@/components/main.css";
import { executeGraphQl } from "@/lib/executeGraphQl";
import { ProductsGetListDocument } from "@/gql/graphql";
import { Pagination } from "@/components/Pagination";

export async function generateStaticParams() {
	return [{ pageNumber: "1" }, { pageNumber: "2" }];
}

export default async function Home() {
	const products = await executeGraphQl({
		query: ProductsGetListDocument,
		variables: {
			page: 1,
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
				<Pagination
					href="/products/"
					length={products.products.meta.pagination.pageCount}
				/>
			</main>
		</>
	);
}
