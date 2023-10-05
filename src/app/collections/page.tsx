import { notFound } from "next/navigation";
import Link from "next/link";
import { type Route } from "next";
import { Pagination } from "@/components/Pagination";
import "@/components/main.css";
import { executeGraphql } from "@/lib/executeGraphql";
import { ProductsGetListDocument } from "@/gql/graphql";

export async function generateStaticParams() {
	return [{ pageNumber: "1" }, { pageNumber: "2" }];
}

export default async function Home() {
	const products = await executeGraphql(ProductsGetListDocument, {
		page: 1,
	});

	if (!products.products) {
		return notFound();
	}

	return (
		<>
			<h1 className="text-4xp mb-2">Collections</h1>
			<main className="container-xl flex min-h-screen w-full flex-col items-center justify-between p-24">
				<Link href={"/collections/cap" as Route}>Czapki</Link>
				<Link href={"/collections/t-shirts" as Route}>T-shirts</Link>
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
